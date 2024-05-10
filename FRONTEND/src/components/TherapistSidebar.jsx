import React from 'react';
import { FaHome, FaUser, FaCalendarAlt, FaBriefcase, FaUserCircle } from 'react-icons/fa'; // Importing Font Awesome icons
import '../styles/Therapistsidebar.css';
import { Link } from 'react-router-dom';
import peace from '../images/peace.png';
import {jwtDecode} from 'jwt-decode'
const Sidebar = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Decode the token to get user ID

  return (
    // <div className="menu">
    <div className="flex flex-col gap-9 h-screen">

       <div className="logo">
       <img src={peace} alt="PeaceMind Logo" className="logo-icon" style={{ width: '250px', height: 'auto' }} />

  
      </div>


      <div className="menu--list">
        <Link to="/TherapistDashboard" className="item">
          <FaHome className="icon"/>
          Therapists Manager Dashboard
        </Link>

        <Link to={`/TherapistTherapistDashboard/${decodedToken.email}`}className="item">
          <FaHome className="icon"/>
          Therapists Dashboard
        </Link>

        <Link to={`/TherapistAppoinment/${decodedToken.fullname}`}className="item"> 
          <FaCalendarAlt className="icon" />
          Appointment
        </Link>

        <Link to={`/TherapistEmergencyAppoinments/${decodedToken.fullname}`} className="item"> 
          <FaCalendarAlt className="icon" />
          Emergency Appointments
        </Link>
      
        <Link to="/TherapistPrehandling" className="item"> 
          <FaBriefcase className="icon" />
          Prescription handling
        </Link>

        <Link to={`/TherapistUserprofile/${decodedToken.id}`} className="item">
          <FaUserCircle className="icon" />
          User Profile
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
