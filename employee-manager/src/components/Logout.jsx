import React from 'react'
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.history.pushState(null, "", window.location.href);
        window.location.replace("/");
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default Logout;