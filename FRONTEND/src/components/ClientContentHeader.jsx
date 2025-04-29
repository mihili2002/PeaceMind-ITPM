import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/peace.png";
import '../App.css';
import { jwtDecode } from "jwt-decode"; // Import jwt_decode
import '../styles/Clientdashboard.css'
import '../styles/Clientcontent.css'

const ContentHeader = () => {
  // Retrieve user ID from localStorage
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token); // Decode the token

  const handleLogout = () => {
    // Remove token from localStorage and redirect to login page
    localStorage.removeItem("token");
    window.location.href = "/ClientLogin";
  };

  return (
  <div className="content--header" >
      <h1 className="header--title">
        <img className="h-30 w-40" src={logo} alt="Logo" />
      </h1>
      <div className="header--activity">
        <button className="bg-blue-400 rounded-xl">
          {/* Pass user ID as a URL parameter */}
          <Link to={`/ClientUserprofile/${decodedToken.id}`}>Profile</Link>
        </button>
        <button className="bg-red-400 rounded-xl" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ContentHeader;
