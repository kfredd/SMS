import React, { useState } from "react";
import { FaFingerprint, FaRegClock, FaUserCheck } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const Attendance = () => {
    // Dummy employee attendance records
    const [attendance, setAttendance] = useState([
        {
            id: "EMP001",
            name: "John Doe",
            date: "2025-09-27",
            timeIn: "08:45 AM",
            timeOut: "05:15 PM",
            totalHours: "8h 30m",
            status: "Present",
        },
        {
            id: "EMP002",
            name: "Jane Smith",
            date: "2025-09-27",
            timeIn: "09:05 AM",
            timeOut: "",
            totalHours: "-",
            status: "Clocked In",
        },
    ]);

    // Simulate biometric clock-in/out (facial/fingerprint)
    const handleBiometric = (empId, action) => {
        setAttendance((prev) =>
            prev.map((emp) =>
                emp.id === empId
                    ? {
                        ...emp,
                        timeIn: action === "in" ? new Date().toLocaleTimeString() : emp.timeIn,
                        timeOut: action === "out" ? new Date().toLocaleTimeString() : emp.timeOut,
                        totalHours:
                            emp.timeIn && action === "out"
                                ? calculateTotalHours(emp.timeIn, new Date().toLocaleTimeString())
                                : emp.totalHours,
                        status: action === "in" ? "Clocked In" : "Present",
                    }
                    : emp
            )
        );
    };

    const calculateTotalHours = (timeIn, timeOut) => {
        const start = new Date(`1970-01-01T${convertTo24(timeIn)}:00`);
        const end = new Date(`1970-01-01T${convertTo24(timeOut)}:00`);
        const diff = (end - start) / (1000 * 60 * 60);
        return `${Math.floor(diff)}h ${Math.round((diff % 1) * 60)}m`;
    };

    const convertTo24 = (time) => {
        let [hours, minutes, meridian] = time.match(/(\d+):(\d+)\s*(AM|PM)/i).slice(1);
        hours = parseInt(hours, 10);
        if (meridian.toUpperCase() === "PM" && hours < 12) hours += 12;
        if (meridian.toUpperCase() === "AM" && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4 d-flex align-items-center gap-2">
                <FaRegClock /> Employee Attendance Sheet
            </h2>

            <div className="card shadow-sm">
                <div className="card-body">
                    <table className="table table-hover table-bordered align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                                <th><MdOutlineDateRange /> Date</th>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Attendance Time</th>
                                <th>Status</th>
                                <th>Biometric Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.date}</td>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={!!emp.timeIn}
                                            readOnly
                                            className="form-check-input"
                                        />{" "}
                                        {emp.timeIn || "--"}
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={!!emp.timeOut}
                                            readOnly
                                            className="form-check-input"
                                        />{" "}
                                        {emp.timeOut || "--"}
                                    </td>
                                    <td>{emp.totalHours}</td>
                                    <td>
                                        <span
                                            className={`badge ${emp.status === "Present"
                                                    ? "bg-success"
                                                    : emp.status === "Clocked In"
                                                        ? "bg-info"
                                                        : "bg-secondary"
                                                }`}
                                        >
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleBiometric(emp.id, "in")}
                                        >
                                            <FaFingerprint /> Clock In
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleBiometric(emp.id, "out")}
                                        >
                                            <FaUserCheck /> Clock Out
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
