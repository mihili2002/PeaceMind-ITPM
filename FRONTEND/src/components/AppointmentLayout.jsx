import React from 'react';
import AppointmenSidebar from './AppointmenSidebar';

const Layout = ({ children }) => {

  return (
    <div className="dashboard">
      <AppointmenSidebar /> {/* Render sidebar only for non-admin routes */}
      <div className="dashboard-content">
        {children} {/* Render the content */}
      </div>
    </div>
  );
};

export default Layout;
