import React, { useState, useEffect } from 'react';
import PaymentContentHeader from './PaymentContentHeader';
import '../../styles/Paymentcontent.css';
import axios from 'axios'; // Assuming you have axios for API calls
import { useParams } from 'react-router-dom';

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { invoiceID } = useParams(); // Access invoice ID from URL parameter



  useEffect(() => {
    const fetchInvoice = async () => {
      if (!invoiceID) return; // Don't fetch if no search term

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8070/payment/Paymentinvoice/${invoiceID}`);
        setInvoiceData(response.data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setError(error.message || 'An error occurred while fetching invoice.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceID]);

 // Function to format date in YYYY-MM-DD format
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

  return (
    <div className="content">
      <PaymentContentHeader />
      {isLoading ? (
        <p>Fetching invoice details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : invoiceData ? (
        <div className="invoice-content">
          <h2 className="invoice-title">Invoice Details</h2>
          <p className="invoice-info">Invoice ID: {invoiceID}</p>
          <p className="invoice-info">Amount Paid: {invoiceData.paidAmount}</p>
          <p className="invoice-info">Paid Date: {formatDate(invoiceData.paidDate)}</p>
          <p className="invoice-info">Payment Type: {invoiceData.paymentType}</p>
          <p className="invoice-info">Bank Name: {invoiceData.bankName}</p>
        </div>
      ) : (
        <p>No invoice found for ID: {invoiceID}</p>
      )}
    </div>
  );
};

export default Invoice;