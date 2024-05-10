import React from 'react'
import {BiHome,BiBookAlt,BiDollar,BiNote, BiPhone, BiPlusMedical} from 'react-icons/bi'
import '../styles/Clientsidebar.css'

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {jwtDecode} from 'jwt-decode';

const Sidebar = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Decode the token
  return (
    <> 
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon"/>
        <h2 className='font-body mt-6 font-bold size-6'> PeaceMind </h2>  
      </div>
      <div className="menu--list">
        <Link to={`/ClientDashboard/${decodedToken.email}`} className="item">
          <BiHome className="icon"/>
          Dashboard
        </Link>
        
        <Link to="/AppointmenContent" className="item"> 
          <BiNote className="icon" />
          Appointment
        </Link>

        <Link to={`/ClientUpcoming/${decodedToken.email}`} className="item">
          <BiDollar className="icon"/>
          Upcoming sessions
        </Link>

        <Link to="/AppointmenHistory" className="item"> 
          <BiNote className="icon" />
          Appointment History
        </Link>

         <Link to="/WaitlistForm" className="item"> 
          <BiPlusMedical className="icon" />
          Waitlist
        </Link> 

        <Link to="/emeInset" className="item"> 
          <BiPhone className="icon" />
          Emergency Portal
        </Link>

        
        <Link to="/PaymentUser/PaymentContent" className="item"> 
          <BiDollar className="icon" />
          Payment Portal
        </Link>


      </div>
    </div>
    </>
  
  )
}

export default Sidebar
