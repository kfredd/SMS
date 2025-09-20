import React from "react";
import { Routes, Route } from "react-router-dom";
import Entry from "./components/Entry";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <Routes>
      {/* Entry page */}
      <Route path="/" element={<Entry />} />

      {/* Login pages */}
      <Route path="/auth/employee/login" element={<EmployeeLogin />} />
      <Route path="/auth/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
