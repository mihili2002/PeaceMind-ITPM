import React from 'react'
import {BiHome,BiBookAlt,BiDollar,BiReply,BiReceipt,BiChart,BiListCheck} from 'react-icons/bi'
import '../styles/Paymentsidebar.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Sidebar = () => {
 
  return (
    <div className="dashboard">
    <div className="menu">
      <div className="logo">
      {/* <img src= "./peacemind_logo.png" className="icon-img"/> */}
        <h2  style={{ fontSize: '1.3em', fontWeight: 'bold'  }}> PeaceMind </h2>
      </div>
      <div className="menu--list">
        <Link to="/PaymentAdmin/PaymentAdminDashboard" className="item">
          <BiHome className="icon"/>
          Dashboard
        </Link>
       
        <Link to="/PaymentAdmin/PaymentManagePayments" className="item"> 
          <BiDollar className="icon" />
         Manage Payments
        </Link>
        
        <Link to="/PaymentAdmin/PaymentAInvoice" className="item">
          <BiReceipt className="icon"/>
          Invoice
        </Link>
        <Link to="/PaymentAdmin/PaymentAMonthlyOverview" className="item">
          <BiChart className="icon"/>
          Monthly Overview
        </Link>
        
      </div>
    </div>
    

    </div>
  )
}

export default Sidebar
