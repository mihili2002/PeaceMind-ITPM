import React, { useState, useEffect } from 'react';
import '../styles/content.css';
import ContentHeader from './ContentHeader';
import { Link } from 'react-router-dom';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch('/api/payment-history');
      if (!response.ok) {
        throw new Error('Failed to fetch payment history');
      }
      const data = await response.json();
      setPaymentHistory(data);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const handleDelete = async (invoiceID) => {
    try {
      await fetch(`/api/payment-history/${invoiceID}`, {
        method: 'DELETE',
      });
      // Remove the deleted record from the paymentHistory state
      setPaymentHistory(paymentHistory.filter(item => item.invoiceID !== invoiceID));
    } catch (error) {
      console.error('Error deleting payment history:', error);
    }
  };

  const filteredPaymentHistory = paymentHistory.filter(item =>
    item.invoiceID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="content">
      <ContentHeader handleSearch={handleSearch} />
      <div className="table-content">
        <h2>Payment History</h2>
        <input
          type="text"
          placeholder="Search by Invoice ID"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Paid Date</th>
              <th>Paid Amount</th>
              <th>Payment Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPaymentHistory.map(item => (
              <tr key={item.invoiceID}>
                <td>
                  <Link to={`/Invoice/${item.invoiceID}`}>{item.invoiceID}</Link>
                </td>
                <td>{item.paidDate}</td>
                <td>{item.paidAmount}</td>
                <td>{item.paymentType}</td>
                <td>
                  <button onClick={() => handleDelete(item.invoiceID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
