import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ add this
import "../styles/Login.css"; // your CSS file

const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ⬅️ hook to navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Replace with real login API
    if (email === "admin@example.com" && password === "password") {
      // ✅ successful login → navigate to HR Dashboard
      navigate("/hr-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Employee Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
