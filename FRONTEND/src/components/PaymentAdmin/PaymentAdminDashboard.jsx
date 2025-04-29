import React from 'react';
import PaymentACard from './PaymentACard';
import '../../styles/PaymentAContent.css';
import PaymentAContentHeader from './PaymentAContentHeader';


const AdminDashboard = () => {
  return (
    <div>
      <PaymentAContentHeader />
      
      <div className="Acard-container">
        <PaymentACard title="Pending Refunds" description="Manage pending refunds." />
        <PaymentACard title="Verify Payments" description="Verify incoming payments." />
        <PaymentACard title="View Payments" description="View all payments." />
        <PaymentACard title="Reports" description="Generate financial reports." />
        <PaymentACard title="Ongoing Coupons" description="Manage ongoing coupons." />
        <PaymentACard title="View Invoices" description="View and manage invoices." />
      </div>
    </div>
  );
};

export default AdminDashboard;
