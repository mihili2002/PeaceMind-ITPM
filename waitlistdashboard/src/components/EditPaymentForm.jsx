import React, { useState } from 'react';
import '../styles/paymentform.css';
import Invoice from './Invoice';
import { useNavigate } from 'react-router-dom';


const EditPaymentForm = ({ formData }) => {
  const [editedFormData, setEditedFormData] = useState(formData);

  
const [showInvoice, setShowInvoice] = useState(false); // Define showInvoice state
const [invoiceID, setInvoiceID] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({ ...editedFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedFormData({ ...editedFormData, paymentSlip: file });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(editedFormData);
    // Display payment success message
    alert('Payment Successful!');
    // Navigate to Invoice page
    navigate('/Invoice', { state: { formData: editedFormData } });
    // Generate unique invoice ID
    setInvoiceID(generateUniqueInvoiceID());
    // Send email to user
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: editedFormData.email,
          message: 'Your payment is done successfully!'
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  
  const handlePaymentTypeChange = (e) => {
    setEditedFormData({ ...formData, paymentType: e.target.value });
  };

  
  const generateUniqueInvoiceID = () => {
    // Define your logic to generate a unique invoice ID
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="payment-form-container">
      
      <form onSubmit={handleSubmit} className="payment-form">
        <label className="payment-form-label">Payment Type:   </label>
        <select name="paymentType" value={editedFormData.paymentType} onChange={handlePaymentTypeChange} className="payment-form-input">
          <option value="">Select Payment Type</option>
          <option value="Booking">Booking</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>

        <br></br><br></br>
        <label className="payment-form-label">Bank Name:</label>
        <input type="text" name="bankName" value={editedFormData.bankName} onChange={handleChange} className="payment-form-input" />

        <label className="payment-form-label">Branch Name:</label>
        <input type="text" name="branchName" value={editedFormData.branchName} onChange={handleChange} className="payment-form-input" />
        
        <label className="payment-form-label">Email:</label>
        <input type="text" name="email" value={editedFormData.email} onChange={handleChange} className="payment-form-input" />

        <label className="payment-form-label">Paid Amount:</label>
        <input type="text" name="paidAmount" value={editedFormData.paidAmount} onChange={handleChange} className="payment-form-input" />

        <label className="payment-form-label">Paid Date:</label>
        <input type="date" name="paidDate" value={editedFormData.paidDate} onChange={handleChange} className="payment-form-input" />

        <label className="payment-form-label">Upload Payment Slip:</label>
        <input type="file" name="paymentSlip" onChange={handleFileChange} className="payment-form-input" />

        <label className="payment-form-label">Reference ID:</label>
        <input type="text" name="referenceID" value={editedFormData.referenceID} onChange={handleChange} className="payment-form-input" />

        <label className="payment-form-label">Note:</label>
        <textarea name="note" value={editedFormData.note} onChange={handleChange} className="payment-form-textarea" />

        <button type="submit" className="payment-form-button">Submit</button>
      </form>
      {showInvoice && (
        <Invoice
          invoiceID={invoiceID} // Replace generateUniqueInvoiceID with your logic to generate a unique ID
          amountPaid={formData.paidAmount}
          paidDate={formData.paidDate}
          paymentType={formData.paymentType}
          bankName={formData.bankName}
        />
      )}
    </div>
  );
};

export default EditPaymentForm;
