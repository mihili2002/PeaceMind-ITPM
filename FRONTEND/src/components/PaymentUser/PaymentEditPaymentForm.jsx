import React, { useState, useEffect } from 'react';
import '../../styles/Paymentpaymentform.css';
import PaymentContentHeader from './PaymentContentHeader'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();

  const [editedFormData, setEditedFormData] = useState({
    paymentType: '',
    bankName: '',
    branchName: '',
    email: '',
    paidAmount: '',
    paidDate: '',
    paymentSlip: null,
    paidMonth: '',
    referenceID: '',
    note: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8070/payment/Paymentget/${id}`)
      .then(res => {
        const paymentData = res.data.payment;

        setEditedFormData({
          paymentType: paymentData.paymentType || '',
          bankName: paymentData.bankName || '',
          branchName: paymentData.branchName || '',
          email: paymentData.email || '',
          paidAmount: paymentData.paidAmount || '',
          paidDate: paymentData.paidDate || '',
          paymentSlip: paymentData.paymentSlip || '',
          paidMonth: paymentData.paidMonth || '',
          referenceID: paymentData.referenceID || '',
          note: paymentData.note || ''
        });

      }).catch(err => console.log(err));
  }, [id]);

  // Validation functions
  function validateBankAndBranchName(name) {
    // Validate that the name contains only letters and spaces
    return /^[a-zA-Z\s]+$/.test(name);
  }

  function validateEmail(email) {
    // Validate email format using a regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePaidAmount(amount) {
    // Validate that the amount is a number
    return !isNaN(amount);
  }

  function validateForm() {
    // Validate each input field
    const isValidBankName = validateBankAndBranchName(editedFormData.bankName);
    const isValidBranchName = validateBankAndBranchName(editedFormData.branchName);
    const isValidEmail = validateEmail(editedFormData.email);
    const isValidPaidAmount = validatePaidAmount(editedFormData.paidAmount);

    // Display error messages for invalid inputs
    if (!isValidBankName) {
      alert("Bank name should contain only letters and spaces.");
      return false;
    }

    if (!isValidBranchName) {
      alert("Branch name should contain only letters and spaces.");
      return false;
    }

    if (!isValidEmail) {
      alert("Invalid email format.");
      return false;
    }

    if (!isValidPaidAmount) {
      alert("Paid amount should be a number.");
      return false;
    }

    // If all validations pass, return true to allow form submission
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    Object.entries(editedFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.put(`http://localhost:8070/payment/Paymentupdate/${id}`, formData)
      .then(res => {
        navigate('/PaymentUser/PaymentPayment_History');
      })
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setEditedFormData({ ...editedFormData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedFormData({ ...editedFormData, paymentSlip: file });
  };

  const handlePaymentTypeChange = (e) => {
    setEditedFormData({ ...editedFormData, paymentType: e.target.value });
  };

  return (
    <div className="content">
      <PaymentContentHeader />
      <div className="payment-form-container">
        <h2> Edit payment details</h2>
        <form onSubmit={handleSubmit} className="payment-form" encType="multipart/form-data">
          <label className="payment-form-label">Payment Type:   </label>
          <select id="paymentType" value={editedFormData.paymentType} onChange={handlePaymentTypeChange} className="payment-form-input">
            <option value="">Select Payment Type</option>
            <option value="Booking">Booking</option>
            <option value="Pharmacy">Pharmacy</option>
          </select>

          <br /><br />
          <label className="payment-form-label">Bank Name:</label>
          <input type="text" id="bankName" value={editedFormData.bankName} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Branch Name:</label>
          <input type="text" id="branchName" value={editedFormData.branchName} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Email:</label>
          <input type="text" id="email" value={editedFormData.email} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Paid Amount:</label>
          <input type="text" id="paidAmount" value={editedFormData.paidAmount} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Paid Date:</label>
          <input type="date" id="paidDate" value={editedFormData.paidDate} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Upload Payment Slip:</label>
          <input type="file" id="paymentSlip" onChange={handleFileChange} className="payment-form-input" />

          <label className="payment-form-label">Paid Month:   </label>
          <select id="paidMonth" value={editedFormData.paidMonth} onChange={handleChange} className="payment-form-input">
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

          <label className="payment-form-label">Reference ID:</label>
          <input type="text" id="referenceID" value={editedFormData.referenceID} onChange={handleChange} className="payment-form-input" />

          <label className="payment-form-label">Note:</label>
          <textarea id="note" value={editedFormData.note} onChange={handleChange} className="payment-form-textarea" />

          <button type="submit" className="payment-form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
