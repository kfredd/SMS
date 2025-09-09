// import React from 'react'
// // import { Routes, Route } from 'react-router-dom';
// import EntryPage from "./components/Entry";

// const App = () => {
//   return (
//     <div>


//       <EntryPage />

//     </div>
//   )
// }

// export default App



import React from "react";
import { Routes, Route } from "react-router-dom";
import Entry from "./components/Entry";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="employeelogin" element={<EmployeeLogin />} />
      <Route path="adminlogin" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
