import React, { useState, useEffect } from 'react';
import PharmacyContentHeader from './PharmacyContentHeader';
import '../styles/Pharmacycontent.css';
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
        const response = await axios.get(`http://localhost:8070/drug/Pharmacyinvoice/${invoiceID}`);
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

 

  return (
    <div className="content">
      <PharmacyContentHeader />
      {isLoading ? (
        <p>Fetching invoice details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : invoiceData ? (
        <div className="invoice-content">
          <h2 className="invoice-title">Invoice Details</h2>
          <p className="invoice-info">Invoice ID: {invoiceID}</p>
          <p className="invoice-info">Drug Paid: {invoiceData.price}</p>
          <p className="invoice-info">Expire Date: {invoiceData.ExDate}</p>
          <p className="invoice-info">Drug Type: {invoiceData.type}</p>
          <p className="invoice-info">Drug Name: {invoiceData.name}</p>
        </div>
      ) : (
        <p>No invoice found for ID: {invoiceID}</p>
      )}
    </div>
  );
};

export default Invoice;