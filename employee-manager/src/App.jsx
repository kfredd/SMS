import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Entry from "./components/Entry";
import HRlogin from "./pages/HR/AdminLogin";
import HRsignup from "./components/Signup";
import HRdashboard from "./pages/HR/OverviewPage";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// HR modules (to match Sidebar)
import EmployeesPage from "./pages/HR/Employees";
import DepartmentsPage from "./pages/HR/Departments";
import RecruitmentPage from "./pages/HR/Recruitment";
import AttendancePage from "./pages/HR/Attendance";
import ClockReportPage from "./pages/HR/ClockReport";
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

  // ✅ Prevent AdminHR from accessing SuperAdmin-only routes
  if (user?.role === "AdminHR" && location.pathname.startsWith("/hr/")) {
    const superAdminOnlyRoutes = ["/hr/settings", "/hr/admins"];
    if (superAdminOnlyRoutes.includes(location.pathname)) {
      return <Navigate to="/hr" replace />;
    }
  }

  // ✅ Optional: lock back/forward navigation when logged in
  useEffect(() => {
    const handlePopState = () => {
      if (user) {
        window.history.go(1); // force stay
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [user]);

  return (
    <div className="page-wrapper">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Entry />} />
        <Route
          path="/api/user/HR/signup"
          element={user ? <Navigate to="/hr" replace /> : <HRsignup />}
        />
        <Route
          path="/api/user/HR/login"
          element={user ? <Navigate to="/hr" replace /> : <HRlogin />}
        />

        {/* HR Dashboard wrapper (Sidebar + Navbar + Footer + Outlet) */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoles={["AdminHR", "SuperAdminHR"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default dashboard overview */}
          <Route index element={<HRdashboard />} />

          {/* HR modules */}
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="recruitment" element={<RecruitmentPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="clockReport" element={<ClockReportPage />} />
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
