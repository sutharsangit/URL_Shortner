import { useState } from "react";
import { supabase } from "./supabaseClient";

function Login({ setSession }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

const handleAuth = async () => {
  let res;

  if (isLogin) {
    res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } else {
    res = await supabase.auth.signUp({
      email,
      password,
    });
  }

  if (res.error) {
    alert(res.error.message);
    return;
  }

  // Force fetch latest session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  setSession(session);
};

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Panel */}
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
        }}
      >
        <h1>🚀 SmartLink</h1>
        <p>Scalable URL Shortening Platform</p>
      </div>

      {/* Right Panel */}
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <div style={{ width: "400px" }}>
          <h2 className="mb-4 text-center">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type={showPwd ? "text" : "password"}
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setShowPwd(!showPwd)}
            />
            <label className="form-check-label">
              Show Password
            </label>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleAuth}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="mt-3 text-center"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Create new account"
              : "Already have account?"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;