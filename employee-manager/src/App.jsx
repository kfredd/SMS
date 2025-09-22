import React from "react";
import { Routes, Route } from "react-router-dom";
import Entry from "./components/Entry";
import HRlogin from "./pages/HR/AdminLogin";
import HRsignup from "./components/Signup";
import HRDashboard from "./pages/HRDashboard";

const App = () => {
  return (
    <Routes>
      {/* Entry page */}
      <Route path="/" element={<Entry />} />

      {/* Login pages */}
      <Route path="/api/user/HR/signup" element={<HRsignup />} />
      <Route path="/api/user/HR/login" element={<HRlogin />} />

      {/* HR Dashboard */}
    </Routes>
  );
};

export default App;
