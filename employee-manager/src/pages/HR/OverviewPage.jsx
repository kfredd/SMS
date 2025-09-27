// src/pages/HR/OverviewPage.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import "../../styles/adminStyles/Dashboard.css";

// ✅ Register chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const OverviewPage = () => {
    // ✅ Dummy HR Stats
    const stats = {
        leaveRequests: [
            { _id: "REQ001", employee: "John Doe", date: "2025-09-15", type: "Annual" },
            { _id: "REQ002", employee: "Jane Smith", date: "2025-09-20", type: "Sick" },
        ],
        recentHires: [
            { _id: "EMP101", name: "Michael Scott", role: "Sales Manager", date: "2025-08-25" },
            { _id: "EMP102", name: "Pam Beesly", role: "HR Assistant", date: "2025-09-01" },
        ],
        topDepartments: [
            { _id: "Sales", employees: 25 },
            { _id: "Engineering", employees: 40 },
            { _id: "HR", employees: 10 },
        ],
    };

    // ✅ Employee Growth Chart
    const employeeGrowthData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [
            {
                label: "Employee Count",
                data: [50, 55, 60, 62, 68, 70, 75, 80, 85],
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="content p-4">
            <h2>HR Dashboard Overview</h2>

            {/* ✅ Top Cards */}
            <div className="container-fluid">
                <div className="row g-3 mb-4">
                    <div className="col-6 col-md-3">
                        <div className="dashboard-card card bg-primary text-white h-100 p-3">
                            <i className="bi bi-people" style={{ fontSize: "2rem" }}></i>
                            <h5 className="mt-2">Employees</h5>
                            <p className="mb-0">120</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="dashboard-card card bg-success text-white h-100 p-3">
                            <i className="bi bi-person-check" style={{ fontSize: "2rem" }}></i>
                            <h5 className="mt-2">Active</h5>
                            <p className="mb-0">110</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="dashboard-card card bg-info text-white h-100 p-3">
                            <i className="bi bi-building" style={{ fontSize: "2rem" }}></i>
                            <h5 className="mt-2">Departments</h5>
                            <p className="mb-0">8</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="dashboard-card card bg-warning text-dark h-100 p-3">
                            <i className="bi bi-briefcase" style={{ fontSize: "2rem" }}></i>
                            <h5 className="mt-2">Open Positions</h5>
                            <p className="mb-0">5</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Employee Growth & Leave Requests */}
            <div className="row mb-4">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5>Employee Growth Over Time</h5>
                        </div>
                        <div className="card-body">
                            <div style={{ position: "relative", width: "100%", height: "300px" }}>
                                <Line
                                    data={employeeGrowthData}
                                    options={{ responsive: true, maintainAspectRatio: false }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5>Upcoming Leave Requests</h5>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.leaveRequests.map((req) => (
                                        <tr key={req._id}>
                                            <td>{req.employee}</td>
                                            <td>{new Date(req.date).toLocaleDateString()}</td>
                                            <td>{req.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ Recent Hires & Top Departments */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Recent Hires</h5>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentHires.map((emp) => (
                                        <tr key={emp._id}>
                                            <td>{emp.name}</td>
                                            <td>{emp.role}</td>
                                            <td>{new Date(emp.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Top Departments</h5>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>Employees</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.topDepartments.map((dept) => (
                                        <tr key={dept._id}>
                                            <td>{dept._id}</td>
                                            <td>{dept.employees}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
