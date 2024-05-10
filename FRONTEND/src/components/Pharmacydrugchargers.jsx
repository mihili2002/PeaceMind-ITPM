import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../styles/PharmacyDrugform.css';
import { useNavigate } from 'react-router-dom';

const styles = {
  
  header: {
    fontSize: 20,
    marginBottom: 10
  },
  
};

const DrugChargers = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [drugPrices, setDrugPrices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    // navigate('/paymentcontent'); 
  };

  useEffect(() => {
    const fetchPrescriptionAndPrices = async () => {
      try {
        const [prescriptionRes, pricesRes] = await Promise.all([
          axios.get(`http://localhost:8070/medical/prescriptions/${id}`),
          axios.get('http://localhost:8070/drug/Pharmacy')
        ]);
        setPrescription(prescriptionRes.data);
        setDrugPrices(pricesRes.data);
        let total = calculateTotal(prescriptionRes.data, pricesRes.data);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptionAndPrices();
  }, [id]);

  const calculateTotal = (prescriptionData, pricesData) => {
    let total = 0;
    if (!prescriptionData || !pricesData) return total;  // Add check to ensure data is present

    const updatedMedications = prescriptionData.medications.map(med => {
      const drugDetails = pricesData.find(drug => drug.name.toLowerCase() === med.medicationName.toLowerCase());
      if (drugDetails) {
        const medTotal = drugDetails.price * Number(med.quantityPerDay) * Number(prescriptionData.refills);
        total += medTotal;
        return { ...med, chargers: medTotal };
      }
      return { ...med, chargers: 0 };
    });
    setPrescription({ ...prescriptionData, medications: updatedMedications });
    return total;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!prescription) return <div>No prescription found.</div>;

  return (
    <div className="content">
      <h2 style={{ fontSize: '1.4em', fontWeight: 'bold' }}>Drug Chargers</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Medication Name</th>
            <th>Dosage</th>
            <th>Quantity Per Day</th>
            <th>Chargers</th>
          </tr>
        </thead>
        <tbody>
          {prescription.medications.map((med, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{med.medicationName}</td>
              <td>{med.dosage}</td>
              <td>{med.quantityPerDay}</td>
              <td>${med.chargers ? med.chargers.toFixed(2) : '0.00'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /><br /><br />
      <form>
        <label htmlFor="TotalAmount" className="Drug-form-label">
          Total Amount:
        </label>
        <input
          type="text"
          id="TotalAmount"
          className="Drug-form-input"
          value={totalAmount ? totalAmount.toFixed(2) : '0.00'}
          readOnly
        />

          <br></br><br></br>
        {/* <button type="button" className="report-button" style={styles.header} onClick={handlePaymentClick}> Send Mail </button> */}
      </form>
    </div>
  );
};

export default DrugChargers;
