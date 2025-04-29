import React, { useState, useEffect } from 'react';
import '../styles/PharmacyDrugform.css';
import PharmacyContentHeader from './PharmacyContentHeader';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function Update() {

  const { id } = useParams();
  const [editedFormData, setEditedFormData] = useState({
    name: '',
    type: '',
    price: '',
    ExDate: '',
    supplierName: '',
    quantity: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8070/drug/Pharmacyget/${id}`)
        .then(res => {
          const { name, type, price, ExDate, supplierName, quantity } = res.data;
          const formattedDate = ExDate ? new Date(ExDate).toISOString().split('T')[0] : '';

          setEditedFormData({
            name: name || '',
            type: type || '',
            price: price || '',
            ExDate: formattedDate,
            supplierName: supplierName || '',
            quantity: quantity || ''
          });
        })
        .catch(err => {
          console.error('Error fetching drug data:', err);
        });
    }
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8070/drug/Pharmacyupdate/${id}`, editedFormData)
      .then(() => {
        navigate('/Pharmacy'); // Redirect to the desired page after update
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setEditedFormData({ ...editedFormData, [e.target.id]: e.target.value });
  };



  return (
    
       <div className="content">
      <PharmacyContentHeader/>
      <div className="Drug-form-container">
      <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}> Edit Drug details</h2>
      <form onSubmit={handleSubmit} className="Drug-form">
        <label className="Drug-form-label">Drug Name:</label>

        <input type="text" id="name"

        value={editedFormData.name} 
        onChange={handleChange} 
        className="Drug-form-input"
        require
         />

        <label className="Drug-form-label">Drug Type:   </label>
        <select id="type" 

        value={editedFormData.type} 
        onChange={handleChange} 
        className="Drug-form-input">

          <option value="">Select Drug Type</option>
          <option value="Tablets">Tablets</option>
          <option value="Capsule">Capsule</option>
          <option value="Syrup">Syrup</option>
          require
        </select>

        <br></br><br></br><br></br>

        <label className="Drug-form-label">Drug Price:</label>
        <input 
        type="text" 
        id="price" 
        value={editedFormData.price} 
        onChange={handleChange} className="Drug-form-input" 
        require/>
        
        <label className="Drug-form-label">Expired Date:</label>
        <input type="date" 
        id="ExDate" 
        value={editedFormData.ExDate} 
        onChange={handleChange} 
        className="Drug-form-input" 
        require/>

        <label className="Drug-form-label">Supplier Name:</label>
        <input type="text" 
        id="supplierName" 
        value={editedFormData.supplierName} 
        onChange={handleChange} 
        className="Drug-form-input" 
        require/>

        <label className="Drug-form-label">Quantity:</label>
        <input type="text" id="quantity"
         value={editedFormData.quantity} 
         onChange={handleChange} 
         className="Drug-form-input" 
         require/>

       
        <button type="submit" className="Drug-form-button">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default Update;
