import React, { useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import LogIn from "../../components/Login"; // your custom component

const EmployeeLogin = () => {
    const loadingbar = useRef(null);

    // ✅ State for form input
    const [signInForm, setSignInForm] = useState({
        email: "",
        password: "",
    });

    // ✅ Handle input change
    const handleSignInForm = (e) => {
        const { name, value } = e.target;
        setSignInForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Handle form submit
    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        loadingbar.current.continuousStart();

        try {
            // Example API request (replace with your backend endpoint)
            const res = await fetch("/api/auth/employee/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signInForm),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("✅ Login success:", data);
                // Example redirect after success
                window.location.href = "/employee/dashboard";
            } else {
                console.error("❌ Login failed:", data.message);
                alert(data.message || "Login failed");
            }
        } catch (err) {
            console.error("⚠️ Error logging in:", err);
        } finally {
            loadingbar.current.complete();
        }
    };

    return (
        <div className="employee-login-container">
            <LoadingBar ref={loadingbar} />
            <div className="employee-login-content d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
                    <LogIn
                        image={"../../src/assets/Employee-Welcome.jpg"}
                        handlesigninform={handleSignInForm}
                        handlesigninsubmit={handleSignInSubmit}
                        targetedstate={"employee"}
                        statevalue={signInForm}
                        redirectpath={"/auth/employee/forgot-password"}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;
