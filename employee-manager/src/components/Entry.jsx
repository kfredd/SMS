import React from "react";
import { Link } from "react-router-dom";
import "../styles/Entry.css";

const Entry = () => {
  return (
    <div className="entry-container">
      <div className="entry-content">
        {/* Image */}
        <img
          src="../../src/assets/Welcome.png"
          alt="Welcome"
          className="entry-image"
        />

        {/* Heading */}
        <h5 className="entry-heading">
          Welcome To Employee Management System, Please Select Your Role to Proceed Further
        </h5>

        {/* Buttons */}
        <div className="entry-buttons">
          <Link to="employeelogin">
            <button className="entry-button">Employee</button>
          </Link>

          <Link to="adminlogin">
            <button className="entry-button">HR-Admin</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Entry;
