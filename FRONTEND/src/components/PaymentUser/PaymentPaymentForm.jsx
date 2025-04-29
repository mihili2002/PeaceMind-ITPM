import React, { useState } from 'react';
import '../../styles/Paymentpaymentform.css'; // Ensure you have the necessary CSS styles imported
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
  const [paymentType, setPaymentType] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [email, setEmail] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [paidDate, setPaidDate] = useState('');
  const [paymentSlip, setPaymentSlip] = useState(null); // Changed initial state to null
  const [paidMonth, setPaidMonth] = useState('');
  const [referenceID, setReferenceID] = useState('');
  const [note, setNote] = useState('');
  const [invoiceID, setInvoiceID] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    bankName: '',
    branchName: '',
    email: '',
    paidAmount: '',
    paidDate: '',
   
    // Add more fields if needed
  });

  const navigate = useNavigate();

  function generateInvoiceID() {
    const prefix = 'INV-';
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    return prefix + timestamp + randomString;
  }

  // Validation functions
  function validateStrings(name) {
    return /^[a-zA-Z\s]+$/.test(name);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePaidAmount(amount) {
    return !isNaN(amount);
  }

  function validatePaidDate(date) {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const differenceInMilliseconds = currentDate.getTime() - selectedDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    return differenceInDays >= 0 && differenceInDays <= 3;
  }

  function validateForm() {
    const isValidBankName = validateStrings(bankName);
    const isValidBranchName = validateStrings(branchName);
    const isValidEmail = validateEmail(email);
    const isValidPaidAmount = validatePaidAmount(paidAmount);
    const isValidPaidDate = validatePaidDate(paidDate);

    setValidationErrors({
      bankName: isValidBankName ? '' : 'Bank name should contain only letters and spaces.',
      branchName: isValidBranchName ? '' : 'Branch name should contain only letters and spaces.',
      email: isValidEmail ? '' : 'Invalid email format.',
      paidAmount: isValidPaidAmount ? '' : 'Paid amount should be a number.',
      paidDate: isValidPaidDate ? '' : 'Please select a date within the past 3 days.',
      // Add more fields if needed
    });

    return isValidBankName && isValidBranchName  && isValidEmail && isValidPaidAmount && isValidPaidDate;
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const generatedInvoiceID = generateInvoiceID(); 
    setInvoiceID(generatedInvoiceID);

    const formData = new FormData();
    formData.append('paymentType', paymentType);
    formData.append('bankName', bankName);
    formData.append('branchName', branchName);
    formData.append('email', email);
    formData.append('paidAmount', paidAmount);
    formData.append('paidDate', paidDate);
    formData.append('paymentSlip', paymentSlip);
    formData.append('paidMonth', paidMonth);
    formData.append('referenceID', referenceID);
    formData.append('note', note);
    formData.append('invoiceID', generatedInvoiceID);

    axios.post("http://localhost:8070/payment/Paymentadd", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      alert("Payment added successfully!");

      // Send email confirmation
      //sendEmailConfirmation(email);

      setPaymentType('');
      setBankName('');
      setBranchName('');
      setEmail('');
      setPaidAmount('');
      setPaidDate('');
      setPaymentSlip(null);
      setPaidMonth('');
      setReferenceID('');
      setNote('');
      
      navigate(`/Paymentinvoice/${generatedInvoiceID}`);
    })
    .catch((err) => {
      alert("Failed to add payment: " + err);
    });
  }
  
  // Function to send email confirmation
  const sendEmailConfirmation = (email) => {
    axios.post("http://localhost:8070/payment/Paymentsend-email", { email })
      .then((response) => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  
  return (
    <div className="payment-form-container">
      <h2> Payment Details</h2>
    
      <form onSubmit={sendData} className="payment-form" encType="multipart/form-data">
        <label htmlFor="paymentType" className="payment-form-label">Payment Type:</label>
        <select id="paymentType" className="payment-form-input" onChange={(e) => setPaymentType(e.target.value)}>
          <option value="">Select Payment Type</option>
          <option value="Booking">Booking</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
        <br /><br />

        {validationErrors.bankName && <p className="validation-error">{validationErrors.bankName}</p>}
        <label htmlFor="bankName" className="payment-form-label">Bank Name:</label>
        <input type="text" id="bankName" className="payment-form-input" onChange={(e) => setBankName(e.target.value)} />

        {validationErrors.branchName && <p className="validation-error">{validationErrors.branchName}</p>}
        <label htmlFor="branchName" className="payment-form-label">Branch Name:</label>
        <input type="text" id="branchName" className="payment-form-input" onChange={(e) => setBranchName(e.target.value)} />

        {validationErrors.email && <p className="validation-error">{validationErrors.email}</p>}
        <label htmlFor="email" className="payment-form-label">Email:</label>
        <input type="text" id="email" className="payment-form-input" autoComplete='email' onChange={(e) => setEmail(e.target.value)} />

        {validationErrors.paidAmount && <p className="validation-error">{validationErrors.paidAmount}</p>}
        <label htmlFor="paidAmount" className="payment-form-label">Paid Amount:</label>
        <input type="text" id="paidAmount" className="payment-form-input" onChange={(e) => setPaidAmount(e.target.value)} />

        {validationErrors.paidDate && <p className="validation-error">{validationErrors.paidDate}</p>}
        <label htmlFor="paidDate" className="payment-form-label">Paid Date:</label>
        <input type="date" id="paidDate" className="payment-form-input" onChange={(e) => setPaidDate(e.target.value)} />

        <label htmlFor="paymentSlip" className="payment-form-label">Upload Payment Slip:</label>
        <input type="file" id="paymentSlip" className="payment-form-input" onChange={(e) => setPaymentSlip(e.target.files[0])} />

        <label htmlFor="paidMonth" className="payment-form-label">Payment Type:</label>
        <select id="paidMonth" className="payment-form-input" onChange={(e) => setPaidMonth(e.target.value)}>
          <option value="">Select Paid Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <br /><br />

        <label htmlFor="referenceID" className="payment-form-label">Reference ID:</label>
        <input type="text" id="referenceID" className="payment-form-input" onChange={(e) => setReferenceID(e.target.value)} />

        <label htmlFor="note" className="payment-form-label">Note:</label>
        <textarea id="note" className="payment-form-textarea" onChange={(e) => setNote(e.target.value)} />
        <button type="submit" className="payment-form-button">Submit</button>
        <button type="button" className="payment-form-button">
          <Link to="/EditPaymentForm">Edit</Link>
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
