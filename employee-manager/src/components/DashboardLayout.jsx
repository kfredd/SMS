// src/components/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../pages/HR/Sidebar";
import Footer from "./Footer";
import "../styles/adminStyles/Dashboard.css";

const DashboardLayout = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="main-content w-100">
                <Navbar />

                <div className="content p-4">
                    {/* ✅ Nested routes render here */}
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;
