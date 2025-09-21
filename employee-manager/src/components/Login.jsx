import React from "react";
import { Link } from "react-router-dom";

const Login = ({ image, handlesigninform, handlesigninsubmit, statevalue, redirectpath }) => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-white">
            <div className="row w-100 g-5 align-items-center">
                {/* Left side image */}
                <div className="col-md-6 d-flex justify-content-end align-items-center p-0 m-0 pe-5">
                    <img
                        src={image}
                        alt="Your Company"
                        className="img-fluid"
                        style={{
                            maxHeight: "380px",
                            objectFit: "cover",
                            marginRight: "0", // no margin
                            paddingRight: "0", // no padding
                        }}
                    />
                </div>

                {/* Right side form */}
                <div className="col-md-5 d-flex justify-content-start align-items-center p-0 m-0 ps-5">
                    <div className="card shadow-sm p-4 w-100 border-0" style={{ maxWidth: "400px" }}>
                        <h4 className="text-center mb-4 fw-bold">Sign in to your account</h4>
                        <form onSubmit={handlesigninsubmit}>
                            {/* Email */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    value={statevalue.email}
                                    onChange={handlesigninform}
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        Password
                                    </label>
                                    <Link to={redirectpath} className="small text-primary">
                                        Forgot password?
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    value={statevalue.password}
                                    onChange={handlesigninform}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;