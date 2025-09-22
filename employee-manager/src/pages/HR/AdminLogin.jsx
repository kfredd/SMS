import React, { useState, useRef } from "react";
import LoginForm from "../../components/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import employeeWelcomeImage from "../../assets/Employee-Welcome.jpg";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // lowercase to match context
  const loadingbar = useRef(null);

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [employeeState, setEmployeeState] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleSignInForm = (e) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login with:", signInForm);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: signInForm.email,
        password: signInForm.password,
      });

      console.log("Response from backend:", res.data);

      if (res.data.token) {
        const userData = {
          token: res.data.token,
          role: res.data.role,
          email: res.data.email,
          firstname: res.data.firstname,
        };

        console.log("Storing userData in context:", userData);
        login(userData); // ✅ now from context

        if (userData.role === "SuperAdminHR") {
          navigate("/api/user/HR/dashboard"); // ✅ unified route
        } else if (userData.role === "AdminHR") {
          navigate("/api/user/HR/dashboard");
        }
      } else {
        alert("Login failed: No token received");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="employee-login-container">
      <div className="employee-login-content d-flex justify-content-center align-items-center vh-100">
        <LoginForm
          image={employeeWelcomeImage}
          handlesigninform={handleSignInForm}
          handlesigninsubmit={handleSignInSubmit}
          targetedstate={employeeState}
          statevalue={signInForm}
          redirectpath={"/auth/employee/forgot-password"}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
