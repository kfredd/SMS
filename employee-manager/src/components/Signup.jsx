import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import welcomeImage from "../assets/Employee-Welcome.jpg";
import "../styles/signup.css";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactnumber: "",
        name: "",
        description: "",
        OrganizationURL: "",
        OrganizationMail: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const res = await axios.post("http://localhost:5000/api/auth/signup", formData);

            setSuccess("Signup successful! Redirecting...");
            setLoading(false);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            setTimeout(() => navigate("/auth/HR/login"), 1500);

        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center align-items-center pt-5">
                {/* Left Image */}
                <div className="col-md-4 text-center mb-4 mb-md-0">
                    <img
                        src={welcomeImage}
                        alt="Your Company"
                        className="img-fluid rounded"
                        style={{ maxHeight: "370px", maxWidth: "100%", objectFit: "cover" }} // ✅ Reduced size
                    />
                </div>

                {/* Right Form */}
                <div className="col-md-6">
                    <form
                        className="row g-4 p-3 bg-white"
                        onSubmit={handleSubmit}
                        style={{ maxWidth: "600px", margin: "0 auto", border: "none", boxShadow: "none" }} // ✅ No borders/shadows
                    >
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        {/* Left Column */}
                        <div className="col-md-6">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                                id="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }} // ✅ Bold border
                            />

                            <label htmlFor="lastname" className="form-label mt-2">Last Name</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                                id="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />

                            <label htmlFor="email" className="form-label mt-2">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-sm custom-input"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />

                            <label htmlFor="password" className="form-label mt-2">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-sm custom-input"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />

                            <label htmlFor="confirmPassword" className="form-label mt-2">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control form-control-sm custom-input"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="col-md-6">
                            <label htmlFor="contactnumber" className="form-label">Contact Number</label>
                            <input
                                type="number"
                                className="form-control form-control-sm custom-input"
                                id="contactnumber"
                                value={formData.contactnumber}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />

                            <label htmlFor="name" className="form-label mt-2">Organization Name</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />

                            <label htmlFor="description" className="form-label mt-2">Organization Description</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />

                            <label htmlFor="OrganizationURL" className="form-label mt-2">Organization URL</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                                id="OrganizationURL"
                                value={formData.OrganizationURL}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />

                            <label htmlFor="OrganizationMail" className="form-label mt-2">Organization Mail</label>
                            <input
                                type="text"
                                className="form-control form-control-sm custom-input"
                                id="OrganizationMail"
                                value={formData.OrganizationMail}
                                onChange={handleChange}
                                style={{ borderWidth: "2px" }}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>

                            <div className="d-flex align-items-center gap-2">
                                <p className="mb-0 small">Already Have an Account?</p>
                                <Link to="/api/user/HR/login" className="btn btn-sm btn-outline-primary">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
