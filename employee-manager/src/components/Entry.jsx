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
        <h3 className="entry-heading">
          Welcome To Employee Management System, Please Select Your Role to Proceed Further
        </h3>

        {/* Buttons */}
        <div className="entry-buttons">
          <Link to="/api/user/EMP/login">
            <button className="entry-button">HR-Admin</button>
          </Link>

          <Link to="/api/user/HR/signup">
            <button className="entry-button">HR-Manager</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Entry;
