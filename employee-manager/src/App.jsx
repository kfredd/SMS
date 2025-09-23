import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Entry from "./components/Entry";
import HRlogin from "./pages/HR/AdminLogin";
import HRsignup from "./components/Signup";

const App = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  // ✅ Restore user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // ✅ Redirect SuperAdmin away from generic dashboard root
  // if (user?.role === "SuperAdminHR" && location.pathname === "/api/user/HR/dashboard") {
  //   return <Navigate to="/api/user/HR/dashboard/reports" replace />;
  // }

  // ✅ Prevent AdminHR from typing SuperAdmin-only URLs manually
  if (user?.role === "AdminHR" && location.pathname.startsWith("/hr/")) {
    const superAdminOnlyRoutes = ["/hr/settings", "/hr/admins"];
    if (superAdminOnlyRoutes.includes(location.pathname)) {
      return <Navigate to="/api/user/HR/dashboard" replace />;
    }
  }

  return (
    <Routes>
      {/* Entry page */}
      <Route path="/" element={<Entry />} />

      {/* Login pages */}
      <Route path="/api/user/HR/signup" element={<HRsignup />} />
      <Route path="/api/user/HR/login" element={<HRlogin />} />
    </Routes>
  );
};

export default App;
