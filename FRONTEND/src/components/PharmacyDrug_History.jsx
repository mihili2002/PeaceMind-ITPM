import React, { useState, useEffect } from 'react';
import '../styles/Pharmacycontent.css';
import PharmacyContentHeader from './PharmacyContentHeader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


export default function DrugHistory(){
  const { id } = useParams();
  const [drugHistory, setDrugHistory] = useState([]); // Renamed from DrugHistory to drugHistory to follow naming conventions

  useEffect(() => {
    const getDrug = () => {
      axios.get('http://localhost:8070/drug/Pharmacy')
      .then((res) => {
        setDrugHistory(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    };
    getDrug();
  }, []);
 
  const navigate = useNavigate();

  const deleteDrug = (id) => {
    axios.delete(`http://localhost:8070/drug/Pharmacydelete/${id}`)
    .then(response => {
      alert('Drug deleted successfully');
      setDrugHistory(drugHistory.filter(drug => drug._id !== id));
      navigate('/Pharmacy');
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };
// Function to format date in YYYY-MM-DD format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
  return (
    <div className="content">
      <PharmacyContentHeader />
      <div className="table-content">
        <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}>Drug History</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Invoice ID</th>
              <th>Drug Name</th>
              <th>Drug Type</th>
              <th>Drug Price</th>
              <th>Expired Date</th>
              <th>Supplier Name</th>
              <th>Quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {drugHistory.map((drug, index) => (
              <tr key={drug._id}>
                <td>{index + 1}</td>
                <td>{drug.invoiceID}</td>
                <td>{drug.name}</td>
                <td>{drug.type}</td>
                <td>{drug.price}</td>
                <td>{formatDate(drug.ExDate)}</td>
                <td>{drug.supplierName}</td>
                <td>{drug.quantity}</td>
                <td>
                  <button className="report-button"><Link to={`/Pharmacyupdate/${drug._id}`}>Edit</Link></button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteDrug(drug._id)} style={{ color: 'red', backgroundColor: 'white', border: '1px solid red' }} >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

