import React, { useState } from 'react';
import axios from 'axios';

function Prescription() {
  
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [medications, setMedications] = useState([{ medicationName: '', dosage: '' }]);
  const [refills, setRefills] = useState('');
  const [instructions, setInstructions] = useState('');
  const [email,setEmail]=useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8070/therapist/createMedical', {
      patientName,
      email,
      doctorName,
      date,
      medications,
      refills,
      instructions,
    })
    .then(res => {
      alert('Prescription submitted');
      
      setPatientName('');
      setEmail('');
      setDoctorName('');
      setDate('');
      setMedications([{ medicationName: '', dosage: '',quantityPerDay:'' }]);
      setRefills('');
      setInstructions('');
    })
    .catch(err => console.error(err));
  };

  
  const handleMedicationChange = (index, field, value) => {
    const newMedications = medications.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setMedications(newMedications);
  };

  
  const addMedication = () => {
    setMedications([...medications, { medicationName: '', dosage: '' ,quantityPerDay:''}]);
  };

  
  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '5px', maxWidth: '1000px' }}>
        <h2 style={{ textAlign: 'center' }}>Medical Prescription</h2>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{ width: '50%', marginRight: '10px' }}>
            <label>Patient Name:</label>
            <input
              type="text"
              placeholder="Enter Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          <div style={{ width: '50%', marginRight: '10px' }}>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ width: '50%' }}>
            <label>Doctor Name:</label>
            <input
              type="text"
              placeholder="Enter Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Medication entries managed dynamically */}
        {medications.map((item, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Medication Name"
              value={item.medicationName}
              onChange={(e) => handleMedicationChange(index, 'medicationName', e.target.value)}
              required
              style={{ flex: 1, marginRight: '10px' }}
            />
            <input
              type="text"
              placeholder="Dosage (e.g., 500mg)"
              value={item.dosage}
              onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
              required
              style={{ flex: 1,marginRight: '10px' }}
            />
             <input
              type="text"
              placeholder="Quantity Per Day (e.g.,2x /1 after meal )"
              value={item.quantityPerDay}
              onChange={(e) => handleMedicationChange(index, 'quantityPerDay', e.target.value)}
              required
              style={{ flex: 1 }}
            />
            {index > 0 && (
              <button type="button" onClick={() => removeMedication(index)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button"  onClick={addMedication} style={{ marginBottom: '10px', backgroundColor:'#5F9EA0' }}>
          Add Medication
        </button>

        <div style={{ marginBottom: '10px' }}>
          <label>Refills:</label>
          <input
            type="number"
            placeholder="Enter number of refills"
            value={refills}
            onChange={(e) => setRefills(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Instructions:</label>
          <textarea
            placeholder="Enter instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#008B8B', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Prescription;
