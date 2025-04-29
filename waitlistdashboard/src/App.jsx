import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import BookingPayment from './components/Booking_Payment';
import PrescriptionPayment from './components/Prescription_Payment';
import MonthlyOverview from './components/Monthly_Overview';
import Invoice from './components/Invoice';
import Refund from './components/Refund';
import './App.css';
import PaymentForm from './components/PaymentForm';
import EditPaymentForm from './components/EditPaymentForm';
import PaymentHistory from './components/Payment_History';
import ContentHeader from './components/ContentHeader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Routes>
            <Route path="/Content" element={<Content />} />
            <Route path="/Booking_Payment" element={<BookingPayment />} />
            <Route path="/Prescription_Payment" element={<PrescriptionPayment />} />
            <Route path="/Refund" element={<Refund />} />
            <Route path="/Invoice" element={<Invoice />} />
            <Route path="/Monthly_Overview" element={<MonthlyOverview />} />
            <Route path="/PaymentForm" element={<PaymentForm />} />
            <Route path="/EditPaymentForm" element={<EditPaymentForm />} />
            <Route path="/Payment_History" element={<PaymentHistory />} />
            <Route
              path="/Content_Header"
              element={<ContentHeader onSearch={handleSearch} />}
            />
            {/* Define other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
