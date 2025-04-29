import React from 'react'
import {BiHome,BiBookAlt,BiDollar,BiChart,BiListCheck} from 'react-icons/bi'
import '../styles/Waitlistsidebar.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const WaitlistSidebar = () => {
 
  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon"/>
        <h2> PeaceMind </h2>
      </div>
      <div className="menu--list">
       
        <Link to="./WaitlistForm" className="item"> 
          <BiDollar className="icon" />
          Waitlist 
        </Link>

        <Link to="./EditPaymentForm" className="item">
          <BiDollar className="icon"/>
          Update Waitlist
        </Link>
       
        <Link to="./Monthly_Overview" className="item">
          <BiChart className="icon"/>
          Monthly Overview
        </Link>
        <Link to="./Payment_History" className="item">
          <BiListCheck className="icon" />
          Waitlist History
        </Link>
      </div>
    </div>
  )
}

export default WaitlistSidebar
