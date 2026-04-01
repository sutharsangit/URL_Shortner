const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const { nanoid } = require("nanoid");
const { createClient: createRedisClient } = require("redis");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ---------------- REDIS ---------------- */
const redisClient = createRedisClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  username: "default",
  password: process.env.REDIS_PASSWORD
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

(async () => {
  await redisClient.connect();
  console.log("✅ Redis connected successfully");
})();

/* ---------------- SUPABASE ---------------- */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* ---------------- HELPERS ---------------- */
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function generateUniqueCode() {
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = nanoid(6);

    const { data } = await supabase
      .from("urls")
      .select("id")
      .eq("short_code", shortCode);

    exists = data.length > 0;
  }

  return shortCode;
}

/* ---------------- ROUTES ---------------- */

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Server running");
});

// Create short URL
app.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !isValidURL(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const shortCode = await generateUniqueCode();

    await supabase.from("urls").insert([
      {
        original_url: url,
        short_code: shortCode,
      },
    ]);

    res.json({
      shortUrl: `http://localhost:${PORT}/${shortCode}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check cache
app.get("/check-cache/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const cachedUrl = await redisClient.get(code);

    res.json({
      status: cachedUrl ? "HIT ⚡" : "MISS 🐢",
      url: cachedUrl || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cache check failed" });
  }
});

// Redirect route
app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    // STEP 1: check cache
    const cachedUrl = await redisClient.get(code);

    if (cachedUrl) {
      // console.log("⚡ CACHE HIT");
      return res.redirect(cachedUrl);
    }

    // console.log("🐢 CACHE MISS");

    // STEP 2: DB lookup
    const { data } = await supabase
      .from("urls")
      .select("*")
      .eq("short_code", code)
      .single();

    if (!data) {
      return res.status(404).send("Not found");
    }

    // STEP 3: cache it
    await redisClient.set(code, data.original_url, {
      EX: 3600,
    });

    // STEP 4: update clicks
    await supabase
      .from("urls")
      .update({ clicks: data.clicks + 1 })
      .eq("short_code", code);

    res.redirect(data.original_url);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Analytics
app.get("/stats/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const { data } = await supabase
      .from("urls")
      .select("*")
      .eq("short_code", code)
      .single();

    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});