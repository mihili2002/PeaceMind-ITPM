import React from 'react';
import PaymentASidebar from './PaymentASidebar';
import '../styles/Paymentcontent.css'

const ALayout = ({ children }) => {
  // Check if the current route is for admin
  const isAdminRoute = window.location.pathname.startsWith('/PaymentUser');

  return (
    <div className="dashboard">
      {!isAdminRoute && <PaymentASidebar />} {/* Render sidebar only for admin routes */}
      <div className="dashboard-content">
        {children} {/* Render the content */}
      </div>
    </div>
  );
};

export default ALayout;
