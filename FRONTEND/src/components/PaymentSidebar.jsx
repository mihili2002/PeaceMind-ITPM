import React from 'react'
import {BiHome,BiBookAlt,BiDollar,BiReply,BiReceipt,BiChart,BiListCheck} from 'react-icons/bi'
import '../styles/Paymentsidebar.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Sidebar = () => {
 
  return (
    <div className="dashboard">
    <div className="menu">
      <div className="logo">
       {/* <img src= "../images/peace_copy.png" className="icon-img"/> */}
        <h2 style={{ fontSize: '1.3em', fontWeight: 'bold'  }}> PeaceMind </h2>
      </div>
      <div className="menu--list">
        <Link to="/PaymentUser/PaymentContent" className="item">
          <BiHome className="icon"/>
          Dashboard
        </Link>
       
        <Link to="/PaymentUser/PaymentBooking_Payment" className="item"> 
          <BiDollar className="icon" />
          Booking Payment
        </Link>

        <Link to="/PaymentUser/PaymentInvoice" className="item">
          <BiReceipt className="icon"/>
          Invoice
        </Link>
        <Link to="/PaymentUser/PaymentMonthly_Overview" className="item">
          <BiChart className="icon"/>
          Monthly Overview
        </Link>
        <Link to="/PaymentUser/PaymentPayment_History" className="item">
          <BiListCheck className="icon" />
          Payment History
        </Link>
      </div>
    </div>
    

    </div>
  )
}

export default Sidebar
