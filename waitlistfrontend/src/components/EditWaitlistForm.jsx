import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [isHover, setIsHover] = useState(false);
;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    contact_number: "",
    Preferred_Doctor: "",
    waitlistDate: "",
    Session_Time: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/waitlist/get/${id}`);
        if (response.status === 200) {
          setFormData(response.data);
        } else {
          console.error('Error fetching profile:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: e.target.name.value,
      address: e.target.address.value,
      email: e.target.email.value,
      contact_number: e.target.contact_number.value,
      Preferred_Doctor: e.target.Preferred_Doctor.value,
      waitlistDate: e.target.waitlistDate.value,
      Session_Time: e.target.Session_Time.value
    };

    const endpoint = `http://localhost:8070/waitlist/update/${id}`;

    axios.put(endpoint, updatedData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Profile updated successfully');
          toast.success('Profile updated successfully');
          setFormData(updatedData); // Update the formData state with the updated data
        } else {
          console.error('Error updating profile:', response.status);
          toast.success('Profile not Updated');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error updating profile');
      });
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    outline: 'none',
  };

  const labelStyle = {
    fontSize: '18px',
    color: '#333',
    marginBottom: '5px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
  };

  const formContainerStyle = {
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Change color on hover
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="content">
      <div style={formContainerStyle}>
        <h2 style={{ color: '#333', fontSize: '28px', textAlign: 'center', marginBottom: '20px' }}>Update Appointment Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" style={labelStyle}>Name:</label>
            <input type="text" id="name" defaultValue={formData.name} onChange={handleInputChange} style={inputStyle} required />
          </div>

          <div>
            <label htmlFor="address" style={labelStyle}>Address:</label>
            <input type="text" id="address" defaultValue={formData.address} onChange={handleInputChange} style={inputStyle} required />
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input type="text" id="email" defaultValue={formData.email} onChange={handleInputChange} style={inputStyle} required />
          </div>

          <div>
            <label htmlFor="contact_number" style={labelStyle}>Contact Number:</label>
            <input type="text" id="contact_number" defaultChecked={formData.contact_number} onChange={handleInputChange} style={inputStyle} required />
          </div>

          <div>
            <label htmlFor="Preferred_Doctor" style={labelStyle}>Preferred Doctor:</label>
            <input type="text" id="Preferred_Doctor" defaultValue={formData.Preferred_Doctor} onChange={handleInputChange} style={inputStyle} required />
          </div>

          <div>
            <label htmlFor="waitlistDate" style={labelStyle}>Date:</label>
            <input type="date" id="waitlistDate" value={formData.waitlistDate} onChange={handleInputChange} style={inputStyle} min={currentDate} />
          </div>

          <div>
            <label htmlFor="Session_Time" style={labelStyle}>Session Time:</label>
            <input type="text" id="Session_Time" value={formData.Session_Time} onChange={handleInputChange} style={inputStyle} required />
          </div>

          <button
            type="submit"
            style={{ ...buttonStyle, ...(isHover ? buttonHoverStyle : {}) }}
            onMouseEnter={() => setIsHover(true)} // Set hover state on mouse enter
            onMouseLeave={() => setIsHover(false)} // Reset hover state on mouse leave
          >
            Submit
          </button>        
          </form>
      </div>
    </div>
  );
}

export default Update;
