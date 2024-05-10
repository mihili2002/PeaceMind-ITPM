import React, { useState } from 'react';
import PaymentContentHeader from './PaymentContentHeader';
import '../../styles/Paymentcontent.css';

const PrescriptionPayment = () => {
  const [formData, setFormData] = useState({
    // Define form fields here
    namefull: '',
    email: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You can perform further actions like submitting the data to a server
  };

  return (
    <div>
      <div className="dashboard-content">
        <PaymentContentHeader />
      </div>
      <form onSubmit={handleSubmit}>
        <label>NameFull:</label>
        <input type="text" name="namefull" value={formData.namefull} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {/* Add more form fields here */}
        <button type="submit">Submit</button>
      </form>
      {/* Display entered data after submission */}
      <div>
        <p>Entered Data:</p>
        <p>NameFull: {formData.namefull}</p>
        <p>Email: {formData.email}</p>
        {/* Display more form fields here */}
      </div>
    </div>
  );
};

export default PrescriptionPayment;
