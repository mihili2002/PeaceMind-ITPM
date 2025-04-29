import React, { useState, useEffect } from 'react';
import '../styles/Pharmacycontent.css';
import PharmacyContentHeader from './PharmacyContentHeader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function ManagePrescription(){
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8070/medical/prescriptions')
      .then(res => setPrescriptions(res.data))
      .catch(err => alert(err.message));
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const sendEmail = (medicalId, status, email) => {
    let message = '';
    if (status === "available") {
      message = "Your prescription list is ready.";
    } else if (status === "not available") {
      message = "Your prescription list is not ready yet. We will let you know when it is ready as soon as possible.";
    }
  
    axios.post('http://localhost:8070/medical/send-email', { email, message })
      .then(() => {
        alert(`Email sent: ${message}`);
        // Update UI to reflect the button press
        const updatedPrescriptions = prescriptions.map(p =>
          p._id === medicalId ? { ...p, emailSent: status } : p
        );
        setPrescriptions(updatedPrescriptions);
      })
      .catch(err => alert(err.message));
  };
  

  return (
    <div className="content">
      <PharmacyContentHeader />
      <div className="table-content">
        <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}>Manage Prescription</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Quantity Per Day</th>
              <th>Refills</th>
              <th>Instruction</th>
              <th>Prescribed Date</th>
              <th>Availability</th>
              <th>Non Availability</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((medical, index) => (
              <tr key={medical._id}>
                <td>{index + 1}</td>
                <td>{medical.email}</td>
                <td>{medical.doctorName}</td>
                <td>{formatDate(medical.date)}</td>
                <td>
                 {medical.medications.map((med, i) => (
                 <div key={i}>
                 <p>{med.medicationName}</p>
               </div>
               ))}
               </td>
               <td>
                 {medical.medications.map((med, i) => (
                 <div key={i}>
                 <p>{med.dosage}</p>
               </div>
               ))}
               </td>

               <td>
                 {medical.medications.map((med, i) => (
                 <div key={i}>
                 <p>{med.quantityPerDay}</p>
               </div>
               ))}
               </td>
                <td>{medical.refills}</td>
                <td>{medical.instructions}</td>
                <td>{formatDate(medical.createdDate)}</td>
                 <td>
                <button
                    style={{ backgroundColor: medical.emailSent === "available" ? "green" : undefined }}
                    onClick={() => sendEmail(medical._id, "available", medical.email)}
                >
                    Available
                </button>
                
                </td>
                <td>
                <Link to={`/Pharmacydrugchargers/${medical._id}`}>
                    <button>
                      View
                    </button>
                  </Link>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


