import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Entry from "./components/Entry";
import HRlogin from "./pages/HR/AdminLogin";
import HRsignup from "./components/Signup";
import HRdashboard from "./pages/HR/Dashboard"; // ✅ Layout with Sidebar
import ProtectedRoute from "./components/ProtectedRoute";

// HR modules (to match Sidebar)
import EmployeesPage from "./pages/HR/Employees";
import DepartmentsPage from "./pages/HR/Departments";
import RecruitmentPage from "./pages/HR/Recruitment";
import AttendancePage from "./pages/HR/Attendance";
import LeavesPage from "./pages/HR/Leaves";
import PayrollPage from "./pages/HR/Payroll";
import PerformancePage from "./pages/HR/Performance";
import ReportsPage from "./pages/HR/Reports";
import AnalyticsPage from "./pages/HR/Analytics";
import SettingsPage from "./pages/HR/Settings";
import Profile from "./pages/HR/Profile";


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
    <div className="page-wrapper">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Entry />} />
        <Route path="/api/user/HR/signup" element={<HRsignup />} />
        <Route path="/api/user/HR/login" element={<HRlogin />} />

        {/* HR Dashboard wrapper (with Sidebar + Outlet) */}
        <Route
          path="/api/user/HR/dashboard"
          element={
            <ProtectedRoute allowedRoles={["AdminHR", "SuperAdminHR"]}>
              <HRdashboard /> {/* ✅ Now acts as layout */}
            </ProtectedRoute>
          }
        >
          <Route index element={<HRdashboard />} />

          {/* Nested HR routes inside Dashboard */}
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="recruitment" element={<RecruitmentPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leaves" element={<LeavesPage />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="performance" element={<PerformancePage />} />


          {/* SuperAdmin only */}
          {user?.role === "SuperAdminHR" && (
            <>
              <Route path="reports" element={<ReportsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<Profile />} />

            </>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
