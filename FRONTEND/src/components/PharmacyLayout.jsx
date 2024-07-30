import React from 'react';
import PharmacySidebar from './PharmacySidebar';

const Layout = ({ children }) => {
  

  return (
    <div className="dashboard">
       <PharmacySidebar /> {/* Render sidebar only for non-admin routes */}
      <div className="dashboard-content">
        {children} {/* Render the content */}
      </div>
    </div>
  );
};

export default Layout;