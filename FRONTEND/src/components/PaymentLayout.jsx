import React from 'react';
import PaymentSidebar from './PaymentSidebar';
import '../styles/Paymentcontent.css'

const Layout = ({ children }) => {
  // Check if the current route is for admin
  const isAdminRoute = window.location.pathname.startsWith('/PaymentAdmin');

  return (
    <div className="dashboard">
      {!isAdminRoute && <PaymentSidebar />} {/* Render sidebar only for non-admin routes */}
      <div className="dashboard-content">
        {children} {/* Render the content */}
      </div>
    </div>
  );
};

export default Layout;
