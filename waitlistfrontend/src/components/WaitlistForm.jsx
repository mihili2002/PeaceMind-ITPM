import React, { useState } from 'react';
import '../styles/waitlistform.css';
import ContentHeader from './WaitlistContentHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Waitlistcontent.css';

const WaitlistForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contact_number, setContactNumber] = useState('');
  const [Preferred_Doctor, setPreferredDoctor] = useState('');
  const [waitlistDate, setWaitlistDate] = useState('');
  const [Session_Time, SetSessionTime] = useState('');
  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !address || !email || !contact_number || !Preferred_Doctor || !waitlistDate || !Session_Time) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Contact number validation
    const contactNumberRegex = /^\d{10}$/; // Assuming a 10-digit contact number
    if (!contactNumberRegex.test(contact_number)) {
      alert("Please enter a valid 10-digit contact number");
      return;
    }

    const formattedwaitlistDate = new Date(waitlistDate);

    const newWaitlist = {
      name,
      address,
      email,
      contact_number,
      Preferred_Doctor,
      waitlistDate: formattedwaitlistDate,
      Session_Time
    }

    axios.post("http://localhost:8070/waitlist/add", newWaitlist)
      .then(() => {
        alert("Waitlist Added done!");
        sendEmailConfirmationEmail(email);
        setName("");
        setAddress("");
        setEmail("");
        setContactNumber("");
        setPreferredDoctor("");
        setWaitlistDate("");
        SetSessionTime("");
      }).catch((err) => {
        alert(err)
      })
  }

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
    maxWidth: '600px', // Adjust the width here
    margin: '0 auto', // Center the form horizontally
  };

  // Function to send email confirmation
  const sendEmailConfirmationEmail = (email) => {
    axios.post("http://localhost:8070/waitlist/send-email", { email })
      .then((response) => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  // Get the current date in the format required by the date input field
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="content">
      <ContentHeader />
      <div className="waitlist-form-container" style={formContainerStyle}>
        <h2>Waitlist Details</h2>
        <form onSubmit={sendData} className="Waitlist-form">
          <label htmlFor="Name" style={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            id="Name"
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern="[A-Za-z\s]+"
            title="Name should contain only letters"
            required
          />

          <div>
            <label htmlFor="Address" style={labelStyle}>
              Address:
            </label>
            <input
              type="text"
              id="Address"
              style={inputStyle}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <label htmlFor="Email" style={labelStyle}>
            Email:
          </label>
          <input
            type="text"
            id="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            title="Please enter a valid email address"
            required
          />

          <label htmlFor="contact" style={labelStyle}>
            Contact Number:
          </label>
          <input
            type="text"
            id="contact"
            style={inputStyle}
            value={contact_number}
            onChange={(e) => setContactNumber(e.target.value)}
            pattern="[0-9]{10}"
            title="Contact number should contain 10 digits"
            required
          />

          <label htmlFor="doctor" style={labelStyle}>
            Preferred Doctor:
          </label>
          <select
            id="doctor"
            style={inputStyle}
            value={Preferred_Doctor}
            onChange={(e) => setPreferredDoctor(e.target.value)}
            required
          >
            <option disabled value="">Select a Doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Brown">Dr. Brown</option>
            <option value="Dr. Miller">Dr. Miller</option>
            <option value="Dr. Wilson">Dr. Wilson</option>
          </select>

          <div style={{ marginTop: '1rem' }}></div>
          <label htmlFor="sessionTime" style={labelStyle}>
            Session Time:
          </label>
          <select
            id="sessionTime"
            style={inputStyle}
            value={Session_Time}
            onChange={(e) => SetSessionTime(e.target.value)}
            required
          >
            <option value="">Select a session Time</option>
            <option value="9.00a.m-11.00a.m">9-11</option>
            <option value="12.p.m-2.00p.m">12-2</option>
            <option value="3.00p.m-5.00p.m">3-5</option>
          </select>

          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="date" style={labelStyle}>
              Date:
            </label>
            <input
              type="date"
              id="date"
              style={inputStyle}
              value={waitlistDate}
              onChange={(e) => setWaitlistDate(e.target.value)}
              min={currentDate} // Prevent past dates from being selected
              required
            />
          </div>

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistForm;
