import React, { useState } from 'react';
import WaitlistSidebar from './components/WaitlistSidebar';
import MonthlyOverview from './components/WaitlistMonthly_Overview';
import './App.css';
import WaitlistForm from './components/WaitlistForm';
import WaitlistHistory from './components/Waitlist_History';
import ContentHeader from './components/WaitlistContentHeader';
import EditPaymentForm from './components/EditWaitlistForm';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
    
      <div className="dashboard">
        <WaitlistSidebar />
        <div className="dashboard-content">
          <Routes>

            <Route path="/Monthly_Overview" element={<MonthlyOverview />} />
            <Route path="/WaitlistForm" element={<WaitlistForm />} />
            <Route path="/add" element={<WaitlistForm />} />
            <Route path="/EditPaymentForm" element={<EditPaymentForm/>}/>
            <Route path="/update/:id" element={<EditPaymentForm/>}/>
            <Route path="/" element={<WaitlistHistory />} />
            <Route path="/Payment_History" element={<WaitlistHistory />} />
            <Route path="/delete/:id" element={<WaitlistHistory />} />
            <Route path="/monthly" element={<MonthlyOverview />} />
            <Route path="/weekly" element={<MonthlyOverview />} />
            <Route path="/send-email" element={<WaitlistForm />} />
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
