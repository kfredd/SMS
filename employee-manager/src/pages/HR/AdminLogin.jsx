import React, { useState, useRef } from "react";
import Login from "../../components/Login";  // ✅ default import
import { useNavigate } from "react-router-dom";
import employeeWelcomeImage from "../../assets/Employee-Welcome.jpg";
import axios from "axios";


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
      [e.target.name]: e.target.value,  // ✅ use name
    });
  };


  // ✅ Handle form submission
  // ✅ Handle form submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: signInForm.email,
        password: signInForm.password,
      });

      // console.log("Submitting login with:", signInForm);

      // ✅ Save JWT token if available
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        // ✅ Clear form fields
        setSignInForm({
          email: "",
          password: "",
        });

        // Redirect immediately after successful login
        console.log("welcome to the dashboard");
        // navigate("/dashboard");
      } else {
        alert("Login failed: No token received");
      }
    } catch (err) {
      // Show proper error message
      alert(err.response?.data?.message || "Invalid email or password");
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
