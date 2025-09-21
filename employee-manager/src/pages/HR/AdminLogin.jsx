import React, { useState, useRef } from "react";
import Login from "../../components/Login";  // ✅ default import
import { useNavigate } from "react-router-dom";
import employeeWelcomeImage from "../../assets/Employee-Welcome.jpg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const loadingbar = useRef(null);

  // ✅ State for login form
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [employeeState, setEmployeeState] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // ✅ Handle input changes
  const handleSignInForm = (e) => {
    setSignInForm({
      ...signInForm,
      [e.target.id]: e.target.value,
    });
  };

  // ✅ Handle form submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setEmployeeState({ loading: true, error: "", success: "" });
    loadingbar.current.continuousStart();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: signInForm.email,
        password: signInForm.password,
      });

      // ✅ Save JWT token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setEmployeeState({
        loading: false,
        error: "",
        success: "Login successful! Redirecting...",
      });

      loadingbar.current.complete();

      // Redirect to dashboard after login
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setEmployeeState({
        loading: false,
        error: err.response?.data?.message || "Invalid email or password",
        success: "",
      });
      loadingbar.current.complete();
    }
  };

  return (
    <div className="employee-login-container">
      {/* <LoadingBar ref={loadingbar} /> */}
      <div className="employee-login-content d-flex justify-content-center align-items-center vh-100">
        <Login image={employeeWelcomeImage}
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
