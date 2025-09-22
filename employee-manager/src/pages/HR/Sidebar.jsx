import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/adminStyles/Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user")) || null;
    const role = user?.role;

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

    // Collapsible sections
    const [openSection, setOpenSection] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setSidebarOpen(true);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) setSidebarOpen(false);

        // ✅ Expand section automatically if route matches
        if (location.pathname.startsWith("/hr/employees") || location.pathname.startsWith("/hr/departments") || location.pathname.startsWith("/hr/recruitment")) {
            setOpenSection("employee");
        } else if (location.pathname.startsWith("/hr/attendance") || location.pathname.startsWith("/hr/leaves") || location.pathname.startsWith("/hr/payroll") || location.pathname.startsWith("/hr/performance")) {
            setOpenSection("operations");
        } else if (location.pathname.startsWith("/hr/reports") || location.pathname.startsWith("/hr/analytics")) {
            setOpenSection("reports");
        } else if (location.pathname.startsWith("/hr/settings") || location.pathname.startsWith("/hr/admins")) {
            setOpenSection("admin");
        }
    }, [location, isMobile]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("Logged out successfully.");
        navigate("/api/user/HR/login");
    };

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    // ✅ Helper to add active class
    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Sidebar toggle button */}
            <button
                className="sidebar-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`modern-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
                <div className="sidebar-header">
                    <h4>HR Panel</h4>
                </div>

                <nav className="sidebar-menu">
                    {/* Dashboard */}
                    <Link
                        to="/api/user/HR/dashboard"
                        className={`sidebar-link ${isActive("/api/user/HR/dashboard") ? "active" : ""}`}
                    >
                        <i className="bi bi-house-door"></i> <span>Dashboard</span>
                    </Link>

                    {/* Employee Management */}
                    <div className="sidebar-section">
                        <button
                            className={`sidebar-section-btn ${openSection === "employee" ? "active" : ""}`}
                            onClick={() => toggleSection("employee")}
                        >
                            <i className="bi bi-people"></i> <span>Employee Management</span>
                            <i
                                className={`bi ${openSection === "employee" ? "bi-chevron-up" : "bi-chevron-down"} ms-auto`}
                            ></i>
                        </button>
                        {openSection === "employee" && (
                            <div className="sidebar-submenu">
                                <Link to="/hr/employees" className={`sidebar-link ${isActive("/hr/employees") ? "active" : ""}`}>
                                    <i className="bi bi-person-badge"></i> Employees
                                </Link>
                                <Link to="/hr/departments" className={`sidebar-link ${isActive("/hr/departments") ? "active" : ""}`}>
                                    <i className="bi bi-diagram-3"></i> Departments
                                </Link>
                                <Link to="/hr/recruitment" className={`sidebar-link ${isActive("/hr/recruitment") ? "active" : ""}`}>
                                    <i className="bi bi-person-plus"></i> Recruitment
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* HR Operations */}
                    <div className="sidebar-section">
                        <button
                            className={`sidebar-section-btn ${openSection === "operations" ? "active" : ""}`}
                            onClick={() => toggleSection("operations")}
                        >
                            <i className="bi bi-briefcase"></i> <span>HR Operations</span>
                            <i
                                className={`bi ${openSection === "operations" ? "bi-chevron-up" : "bi-chevron-down"} ms-auto`}
                            ></i>
                        </button>
                        {openSection === "operations" && (
                            <div className="sidebar-submenu">
                                <Link to="/hr/attendance" className={`sidebar-link ${isActive("/hr/attendance") ? "active" : ""}`}>
                                    <i className="bi bi-clock-history"></i> Attendance
                                </Link>
                                <Link to="/hr/leaves" className={`sidebar-link ${isActive("/hr/leaves") ? "active" : ""}`}>
                                    <i className="bi bi-calendar-check"></i> Leave Management
                                </Link>
                                <Link to="/hr/payroll" className={`sidebar-link ${isActive("/hr/payroll") ? "active" : ""}`}>
                                    <i className="bi bi-cash-coin"></i> Payroll
                                </Link>
                                <Link to="/hr/performance" className={`sidebar-link ${isActive("/hr/performance") ? "active" : ""}`}>
                                    <i className="bi bi-graph-up-arrow"></i> Performance
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Reports & Analytics */}
                    {/* <div className="sidebar-section">

                    </div> */}

                    {/* SuperAdminHR only */}
                    {role === "SuperAdminHR" && (
                        <div className="sidebar-section">
                            <button
                                className={`sidebar-section-btn ${openSection === "admin" ? "active" : ""}`}
                                onClick={() => toggleSection("admin")}
                            >
                                <i className="bi bi-shield-lock"></i> <span>Administration</span>
                                <i
                                    className={`bi ${openSection === "admin" ? "bi-chevron-up" : "bi-chevron-down"} ms-auto`}
                                ></i>
                            </button>
                            {openSection === "admin" && (
                                <div className="sidebar-submenu">
                                    <Link to="/hr/settings" className={`sidebar-link ${isActive("/hr/settings") ? "active" : ""}`}>
                                        <i className="bi bi-gear"></i> Settings
                                    </Link>
                                    <Link to="/hr/admins" className={`sidebar-link ${isActive("/hr/profile") ? "active" : ""}`}>
                                        <i className="bi bi-person-gear"></i> Admin Management
                                    </Link>
                                </div>
                            )}
                            {/* Reports & Analytics */}
                            <button
                                className={`sidebar-section-btn ${openSection === "reports" ? "active" : ""}`}
                                onClick={() => toggleSection("reports")}
                            >
                                <i className="bi bi-bar-chart"></i> <span>Reports & Analytics</span>
                                <i
                                    className={`bi ${openSection === "reports" ? "bi-chevron-up" : "bi-chevron-down"} ms-auto`}
                                ></i>
                            </button>
                            {openSection === "reports" && (
                                <div className="sidebar-submenu">
                                    <Link to="/hr/reports" className={`sidebar-link ${isActive("/hr/reports") ? "active" : ""}`}>
                                        <i className="bi bi-file-earmark-text"></i> Reports
                                    </Link>
                                    <Link to="/hr/analytics" className={`sidebar-link ${isActive("/hr/analytics") ? "active" : ""}`}>
                                        <i className="bi bi-pie-chart"></i> Analytics
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Logout */}
                    <button className="sidebar-link logout-btn" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
                    </button>
                </nav>
            </div>

            {sidebarOpen && isMobile && (
                <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
            )}
        </>
    );
};

export default Sidebar;
