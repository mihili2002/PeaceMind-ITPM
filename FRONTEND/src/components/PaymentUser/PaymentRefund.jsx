import React, { useState } from 'react';
import '../../styles/Paymentrefund.css'; // Import CSS for Refund form styling

const Refund = () => {
  // State variables for form inputs and refund data
  const [invoiceId, setInvoiceId] = useState('');
  const [reason, setReason] = useState('');
  const [refundData, setRefundData] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to backend)
    const newRefund = {
      invoiceId: invoiceId,
      refundStatus: "Pending", // Assuming refund status is initially pending
      refundAmount: "N/A" // Assuming refund amount is not yet determined
    };
    setRefundData([...refundData, newRefund]);
    // Reset form fields
    setInvoiceId('');
    setReason('');
  };

  return (
    <div className="refund-container">
      <h2>Refund Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="invoiceId">Invoice ID:</label>
          <input
            type="text"
            id="invoiceId"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Refund Requesting Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display refund data in a table */}
      <h2>Refund History</h2>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Refund Status</th>
            <th>Refund Amount</th>
          </tr>
        </thead>
        <tbody>
          {refundData.map((refund, index) => (
            <tr key={index}>
              <td>{refund.invoiceId}</td>
              <td>{refund.refundStatus}</td>
              <td>{refund.refundAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Refund;
