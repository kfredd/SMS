import React, { useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { SignIn } from "./SignIn"; 

const Login = () => {
    const loadingbar = useRef(null);

    // ✅ state for login form
    const [signInForm, setSignInForm] = useState({
        email: "",
        password: "",
    });

    // ✅ error handling
    const [employeeState, setEmployeeState] = useState({
        error: { status: false, message: "" },
    });

    // handle form inputs
    const handleSignInForm = (e) => {
        const { name, value } = e.target;
        setSignInForm((prev) => ({ ...prev, [name]: value }));
    };

    // handle submit
    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        loadingbar.current.continuousStart();

        try {
            // Example API call
            const res = await fetch("/api/auth/employee/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signInForm),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("✅ Login success:", data);
                window.location.href = "/employee/dashboard";
            } else {
                setEmployeeState({
                    error: { status: true, message: data.message || "Login failed" },
                });
            }
        } catch {
            setEmployeeState({
                error: { status: true, message: "Something went wrong. Try again." },
            });
        } finally {
            loadingbar.current.complete();
        }
    };

    return (
        <div className="employee-login-container">
            <LoadingBar ref={loadingbar} />
            <div className="employee-login-content d-flex justify-content-center align-items-center vh-100">
                <SignIn
                    image={"../../src/assets/Employee-Welcome.jpg"}
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

export default Login;
