import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <p>Loading...</p>;

    // ✅ If no user → force redirect to login, keep original location for potential redirect back
    if (!user) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    // ✅ Role-based protection
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
