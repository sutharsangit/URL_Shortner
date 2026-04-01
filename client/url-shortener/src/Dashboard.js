import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserEmail(user.email);
    }
  };

  const handleShorten = async () => {
    if (!url) return alert("Enter URL");

    try {
      const res = await axios.post(
        "http://localhost:5000/shorten",
        { url }
      );

      setShortUrl(res.data.shortUrl);
      setTotalLinks((prev) => prev + 1);
      setUrl("");
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "white",
        padding: "40px",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1>🚀 SmartLink Dashboard</h1>
            <p>Welcome, {userEmail}</p>
          </div>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* URL Shortener Card */}
        <div className="card p-4 shadow rounded-4 mb-4">
          <h4>🔗 Shorten New URL</h4>

          <div className="row mt-3">
            <div className="col-md-9">
              <input
                className="form-control"
                placeholder="Enter long URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-primary w-100"
                onClick={handleShorten}
              >
                Shorten
              </button>
            </div>
          </div>

          {shortUrl && (
            <div className="alert alert-success mt-3">
              <strong>Short URL:</strong>{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="card p-4 shadow rounded-4">
          <h4>📊 User Statistics</h4>
          <p className="mt-3">
            Total URLs created in this session: {totalLinks}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;