import React, { useState } from 'react';
import EditPaymentForm from './EditPaymentForm';
import '../styles/paymentform.css';
import { useNavigate } from 'react-router-dom';


const PaymentForm = ({ addPaymentToHistory }) => {
  const [formData, setFormData] = useState({
    paymentType:'',
    bankName: '',
    branchName: '',
    email:'',
    paidAmount: '',
    paidDate: '',
    paymentSlip: null,
    referenceID: '',
    note: ''
  });

  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceID, setInvoiceID] = useState('');

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, paymentSlip: file });
  };

  // Define fetchPaymentHistory function
  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch('/api/payment-history');
      if (!response.ok) {
        throw new Error('Failed to fetch payment history');
      }
      const paymentHistory = await response.json();
      // Update state or do something with payment history data
      console.log(paymentHistory);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Display payment success message
    alert('Payment Successful!');
    // Navigate to Invoice page
    navigate('/Invoice', { state: { formData } });
    // Generate unique invoice ID
    const generatedInvoiceID = generateUniqueInvoiceID();
    setInvoiceID(generateUniqueInvoiceID());
    // Send email to user
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          message: 'Your payment is done successfully!'
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    try {
      // Submit form data
      const response = await fetch('/api/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit payment');
      }

      // Fetch and update payment history
      fetchPaymentHistory();
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
     // Add payment data to payment history
     addPaymentToHistory({ invoiceID: generatedInvoiceID, ...formData });
  };
  


  const handleEditClick = () => {
    // Set editing state to true to switch to EditPaymentForm
    setEditing(true);
  };

  
  const handlePaymentTypeChange = (e) => {
    setFormData({ ...formData, paymentType: e.target.value });
  };

  
  const generateUniqueInvoiceID = () => {
    // Define your logic to generate a unique invoice ID
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Details</h2>
      {!editing ? (
        <form onSubmit={handleSubmit} className="payment-form">
         <label className="payment-form-label">Payment Type:   </label>
            <select name="paymentType" value={formData.paymentType} onChange={handlePaymentTypeChange} className="payment-form-input">
          <option value="">Select Payment Type</option>
          <option value="Booking">Booking</option>
          <option value="Pharmacy">Pharmacy</option>
           </select>
 
          <br>
          </br><br></br>
          <label className="payment-form-label">Bank Name:</label>
          <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Branch Name:</label>
          <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Paid Amount:</label>
          <input type="text" name="paidAmount" value={formData.paidAmount} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Paid Date:</label>
          <input type="date" name="paidDate" value={formData.paidDate} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Upload Payment Slip:</label>
          <input type="file" name="paymentSlip" onChange={handleFileChange} className="payment-form-input" />

          <label className="payment-form-label">Reference ID:</label>
          <input type="text" name="referenceID" value={formData.referenceID} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Note:</label>
          <textarea name="note" value={formData.note} onChange={handleChange} className="payment-form-textarea" />

          <button type="submit" className="payment-form-button">Submit</button>
          <button type="button" className="payment-form-button" onClick={handleEditClick}>Edit</button>
        </form>
      ) : (
        <EditPaymentForm formData={formData} />
      )}
    </div>
  );
};

export default PaymentForm;
