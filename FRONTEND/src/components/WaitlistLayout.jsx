import React from 'react';
import WaitlistSidebar from './WaitlistSidebar';

const Layout = ({ children }) => {

  return (
    <div className="dashboard">
      <WaitlistSidebar /> {/* Render sidebar only for non-admin routes */}
      <div className="dashboard-content">
        {children} {/* Render the content */}
      </div>
    </div>
  );
};

export default Layout;
