import React from 'react';
import { NavLink, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import About from './components/About';
//import Contact from './components/Contact';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <NavLink to="/emeInset" className="text-white hover:text-gray-200">
            Home
          </NavLink>
          <NavLink to="/all" className="text-white hover:text-gray-200">
            Emergency Appointment
          </NavLink>
          <NavLink to="/de" className="text-white hover:text-gray-200">
            Deleted Emergency Appointment
          </NavLink>
          <NavLink to="/re" className="text-white hover:text-gray-200">
            Emergency Report
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

      {/* <div style={{alignContent:"center"}}>
      <nav class="navbar navbar-expand-lg" style={{ backgroundColor: "#8ab8da", alignContent:"center"}}>
       
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" style={{ color: "Black" }} href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style={{ color: "Black" }} href="/all">Emergency Appoinment</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style={{ color: "Black" }} href="/de">Deleted Emergency Appoinment</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style={{ color: "Black" }} href="/re"> Emergency Report</a>
            </li>
          </ul>
         
        </div>
      </nav>
      </div> */}