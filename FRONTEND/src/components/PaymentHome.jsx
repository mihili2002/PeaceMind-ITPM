import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  const handleAdminPortalClick = () => {
    // Navigate to Sidebar component
    navigate('/PaymentAdmin/PaymentAdminDashboard');
  };

  const handleUserPortalClick = () => {
    // Navigate to Sidebar component
    navigate('/PaymentUser/PaymentContent');
  };

  return (
    <div className="portal-buttons">
      <button className="report-button" onClick={handleAdminPortalClick}>Admin Portal</button>
      <button className="report-button" onClick={handleUserPortalClick}>User Portal</button>
    </div>
  )
}

export default Home
