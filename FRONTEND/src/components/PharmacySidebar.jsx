import React from 'react';
import { BiBookAlt, BiDollar, BiChart, BiListCheck, BiReceipt } from 'react-icons/bi';
import '../styles/Pharmacysidebar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon"/>
        <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}> PeaceMind </h2>
      </div>
      <div className="menu--list">
        <Link to="/Pharmacyadd" className="item"> {/* Corrected path */}
          <BiDollar className="icon" />
          Pharmacy 
        </Link>

        <Link to="/PharmacyEditDrugForm" className="item">
          <BiDollar className="icon"/>
          Update Pharmacy
        </Link>

        <Link to="/PharmacyInvoice" className="item">
          <BiReceipt className="icon"/>
          Invoice
        </Link>
       
        <Link to="/PharmacyMonthly_Overview" className="item">
          <BiChart className="icon"/>
          Monthly Overview
        </Link>
        
        <Link to="/Pharmacyprescriptions " className="item">
          <BiReceipt className="icon"/>
          Manage Prescription
        </Link>
        
        <Link to="/Pharmacy" className="item"> {/* Change the link to match the route for DrugHistory */}
        <BiListCheck className="icon" />
         Pharmacy History
        </Link>

      </div>
    </div>
  )
}

export default Sidebar;
