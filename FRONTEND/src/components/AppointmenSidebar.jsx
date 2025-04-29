import React from 'react'
import {BiHome,BiBookAlt,BiDollar,BiReply,BiReceipt,BiChart,BiListCheck} from 'react-icons/bi'
import '../styles/Appointmensidebar.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Sidebar = () => {
 
  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon"/>
        <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}> PeaceMind </h2>
      </div>
      <div className="menu--list">
        <Link to="" className="item">
          <BiHome className="icon"/>
          Dashboard
        </Link>
       
        <Link to="/Appointmencontent " className="item"> 
          <BiDollar className="icon" />
          Appoinment
        </Link>

        <Link to=" " className="item">
          <BiDollar className="icon"/>
          Upcoming Sessions
        </Link>
        <Link to="/AppointmenHistory" className="item">
          <BiReply className="icon"/>
          Appointment History
        </Link>
        {/* <Link to=" " className="item">
          <BiReceipt className="icon"/>
          Invoice
        </Link>
        <Link to=" " className="item">
          <BiChart className="icon"/>
          Monthly Overview
        </Link>
        <Link to=" " className="item">
          <BiListCheck className="icon" />
          Payment History
        </Link> */}
      </div>
    </div>
  )
}

export default Sidebar
