import React from "react";
import { Link } from "react-router-dom";

const Entry = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center px-3">
                {/* Image & Heading */}
                <div className="mb-4">
                    <img
                        src="../../src/assets/Welcome.png"
                        alt="Welcome"
                        className="img-fluid mb-3"
                        style={{ maxWidth: "500px" }}
                    />
                    <h1 className="h5 text-primary fw-bold">
                        Welcome To Employee Management System, Please Select Your Role to
                        Proceed Further
                    </h1>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3">
                    {/* <Link to={"/auth/employee/login"}></Link> */}
                    <button className="btn btn-lg btn-primary fw-bold">
                        Employee
                    </button>

                    {/* <Link to={"/auth/employee/login"}></Link> */}
                    <button className="btn btn-lg btn-primary fw-bold">
                        HR-Admin
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Entry;
