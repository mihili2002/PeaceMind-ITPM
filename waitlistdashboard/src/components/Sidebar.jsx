import React from 'react'
import {BiHome,BiBookAlt,BiDollar,BiReply,BiReceipt,BiChart,BiListCheck} from 'react-icons/bi'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Sidebar = () => {
 
  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon"/>
        <h2> PeaceMind </h2>
      </div>
      <div className="menu--list">
        <Link to="./Content" className="item">
          <BiHome className="icon"/>
          Dashboard
        </Link>
       
        <Link to="./Booking_Payment" className="item"> 
          <BiDollar className="icon" />
          Booking Payment
        </Link>

        <Link to="./Prescription_Payment" className="item">
          <BiDollar className="icon"/>
          Prescription Payment
        </Link>
        <Link to="./Refund" className="item">
          <BiReply className="icon"/>
          Refunds
        </Link>
        <Link to="./Invoice" className="item">
          <BiReceipt className="icon"/>
          Invoice
        </Link>
        <Link to="./Monthly_Overview" className="item">
          <BiChart className="icon"/>
          Monthly Overview
        </Link>
        <Link to="./Payment_History" className="item">
          <BiListCheck className="icon" />
          Payment History
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
