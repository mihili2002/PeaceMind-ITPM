import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Add useNavigate here
import axios from 'axios';
import '../styles/PharmacyDrugform.css';
import '../styles/Pharmacycontent.css';
import PharmacyContentHeader from './PharmacyContentHeader';



const DrugForm = () => {
  const [name, setDrugName] = useState('');
  const [type, setDrugType] = useState('');
  const [price, setDrugPrice] = useState('');
  const [ExDate, setExpiredDate] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [invoiceID, setInvoiceID] = useState('');
  
  


  const navigate = useNavigate();

  function generateInvoiceID() {
    const prefix = 'INV-';
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
    return prefix + timestamp + randomString;
  }


  function sendData(e) {
    e.preventDefault();

    const generatedInvoiceID = generateInvoiceID();
    setInvoiceID(generatedInvoiceID); // Set invoice ID in state


    // Ensure ExDate is in valid format
    const formattedExDate = new Date(ExDate);

    const newDrug = {
      name,
      type,
      price: parseFloat(price), // Convert price to a float
      ExDate: formattedExDate, // Use formattedExDate
      supplierName,
      quantity: parseInt(quantity), // Convert quantity to an integer
      invoiceID: generatedInvoiceID // Include generated invoiceID

    };

    

    axios.post('http://localhost:8070/drug/Pharmacyadd', newDrug)
      .then(() => {
        alert('Drug Added successfully!');
        // Reset form fields after successful submission
        setDrugName('');
        setDrugType('');
        setDrugPrice('');
        setExpiredDate('');
        setSupplierName('');
        setQuantity('');

        navigate(`/Pharmacy`); // Redirect with invoice ID in URL

      })
      .catch((err) => {
        alert(err);
      });
  }

  

  return (
    <div className="content">
      <PharmacyContentHeader />
      <div className="Drug-form-container">
        <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}>Drug Details</h2>
        <form onSubmit={sendData} className="Drug-form">
          <label htmlFor="DrugName" className="Drug-form-label">
            DrugName:
          </label>
          <input
            type="text"
            id="DrugName"
            className="Drug-form-input"
            value={name}
            onChange={(e) => {
              setDrugName(e.target.value);
            }}
            require
          />

          <label htmlFor="DrugType" className="Drug-form-label">
            DrugType:
          </label>
          <select
            id="DrugType"
            className="Drug-form-input"
            value={type}
            onChange={(e) => {
              setDrugType(e.target.value);
            }}
          >
            <option value="">Select Drug Type</option>
            <option value="Tablets">Tablets</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            require
          </select>

          <br /><br />
          <label htmlFor="DrugPrice" className="Drug-form-label">
            DrugPrice:
          </label>
          <input
            type="text"
            id="DrugPrice"
            className="Drug-form-input"
            value={price}
            onChange={(e) => {
              setDrugPrice(e.target.value);
            }}
            require
          />

          <label htmlFor="ExpiredDate" className="Drug-form-label">
            ExpiredDate:
          </label>
          <input
            type="date"
            id="ExpiredDate"
            className="Drug-form-input"
            value={ExDate}
            onChange={(e) => {
              setExpiredDate(e.target.value);
            }}
            require
          />

          <label htmlFor="SupplierName" className="Drug-form-label">
            SupplierName:
          </label>
          <input
            type="text"
            id="SupplierName"
            className="Drug-form-input"
            value={supplierName}
            onChange={(e) => {
              setSupplierName(e.target.value);
            }}
            require
          />

          <label htmlFor="Quantity" className="Drug-form-label">
            Quantity:
          </label>
          <input
            type="text"
            id="Quantity"
            className="Drug-form-input"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            require
          />

          <button type="submit" className="Drug-form-button">
            Submit
          </button>
          <button type="button" className="Drug-form-button">
            <Link to="/EditDrugForm">Edit</Link>
          </button>
        </form>
      </div>
      
      
      

    </div>
  );
};

export default DrugForm;