import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/adminStyles/Navbar.css";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    // const location = useLocation();

    // ✅ Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogout = () => {
        alert("Logged out successfully.");
        navigate("/");
    };


    return (
        <nav className="navbar bg-light shadow-sm px-3">
            {/* Logo */}
            <div className="d-flex align-items-center me-4">
                {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}
                <h1>SMS</h1>
            </div>

            {/* Right Section */}
            <div className="d-flex align-items-center ms-auto">
                {/* Storefront (Eye Icon) */}
                <i
                    className="bi bi-eye mx-2"
                    style={{ cursor: "pointer" }}
                    title="View Storefront"
                ></i>

                {/* Notifications Bell */}
                <div className="position-relative mx-3">
                    <i
                        className="bi bi-bell"
                        style={{ cursor: "pointer", fontSize: "1.5rem" }}
                        title="New Orders"
                    ></i>
                    {/* Example static badge */}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                    </span>
                </div>

                {/* Profile Dropdown */}
                <div className="dropdown" ref={dropdownRef}>
                    <i
                        className="bi bi-person-circle dropdown-toggle mx-2"
                        role="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                    ></i>
                    <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                        <li>
                            <span className="dropdown-item">
                                <strong>Admin</strong>
                            </span>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/admin/admin_profile">
                                <i className="bi bi-person me-2"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/admin/manage_settings">
                                <i className="bi bi-gear me-2"></i> Settings
                            </Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-2"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
