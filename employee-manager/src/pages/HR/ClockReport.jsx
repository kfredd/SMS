import React, { useState } from "react";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ClockReport = () => {
    const employees = [
        { id: "EMP001", name: "John Doe" },
        { id: "EMP002", name: "Jane Smith" },
        { id: "EMP003", name: "Michael Johnson" },
        { id: "EMP004", name: "Emily Davis" },
    ];

    // Example daily attendance for a date
    const [dailyAttendance] = useState([
        { id: "EMP001", name: "John Doe", date: "2025-09-27", timeIn: "08:45 AM", timeOut: "05:10 PM", status: "Present" },
        { id: "EMP002", name: "Jane Smith", date: "2025-09-27", timeIn: "09:05 AM", timeOut: "", status: "Clocked In" },
        { id: "EMP003", name: "Michael Johnson", date: "2025-09-27", timeIn: "", timeOut: "", status: "Absent" },
        { id: "EMP004", name: "Emily Davis", date: "2025-09-27", timeIn: "08:55 AM", timeOut: "05:00 PM", status: "Present" },
    ]);

    // Example monthly summary
    const [monthlySummary] = useState({
        EMP001: [true, true, true, false, true, true, true],
        EMP002: [true, false, true, true, true, false, true],
        EMP003: [false, false, true, true, false, true, true],
        EMP004: [true, true, true, true, true, true, true],
    });

    const daysInMonth = ["1", "2", "3", "4", "5", "6", "7"]; // Example

    const [reportType, setReportType] = useState("daily");
    const [selectedDate, setSelectedDate] = useState("2025-09-27");
    const [selectedMonth, setSelectedMonth] = useState("2025-09");

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4 d-flex align-items-center gap-2">
                <FaCalendarAlt /> Attendance & Clocking Reports
            </h2>

            {/* FILTERS */}
            <div className="card shadow-sm mb-4">
                <div className="card-body d-flex flex-wrap align-items-center gap-3">
                    {/* Toggle Daily / Monthly */}
                    <select
                        className="form-select w-auto"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="daily">Daily Report</option>
                        <option value="monthly">Monthly Summary</option>
                    </select>

                    {/* Date Picker */}
                    {reportType === "daily" && (
                        <input
                            type="date"
                            className="form-control w-auto"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    )}

                    {/* Month Picker */}
                    {reportType === "monthly" && (
                        <input
                            type="month"
                            className="form-control w-auto"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        />
                    )}
                </div>
            </div>

            {/* ---------------- DAILY ATTENDANCE ---------------- */}
            {reportType === "daily" && (
                <div className="card shadow-sm mb-5">
                    <div className="card-header bg-primary text-white">
                        <h5>Daily Attendance Report - {selectedDate}</h5>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Clock In</th>
                                    <th>Clock Out</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dailyAttendance.map((record) => (
                                    <tr key={record.id}>
                                        <td>{record.date}</td>
                                        <td>{record.id}</td>
                                        <td>{record.name}</td>
                                        <td>{record.timeIn || "--"}</td>
                                        <td>{record.timeOut || "--"}</td>
                                        <td>
                                            <span
                                                className={`badge ${record.status === "Present"
                                                        ? "bg-success"
                                                        : record.status === "Clocked In"
                                                            ? "bg-info"
                                                            : "bg-danger"
                                                    }`}
                                            >
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ---------------- MONTHLY SUMMARY ---------------- */}
            {reportType === "monthly" && (
                <div className="card shadow-sm">
                    <div className="card-header bg-secondary text-white">
                        <h5>Monthly Attendance Summary - {selectedMonth}</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered text-center align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        {daysInMonth.map((day) => (
                                            <th key={day}>{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id}>
                                            <td>{emp.id}</td>
                                            <td>{emp.name}</td>
                                            {daysInMonth.map((day, index) => (
                                                <td key={index}>
                                                    {monthlySummary[emp.id] && monthlySummary[emp.id][index] ? (
                                                        <FaCheckCircle className="text-success" />
                                                    ) : (
                                                        <FaTimesCircle className="text-danger" />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClockReport;
