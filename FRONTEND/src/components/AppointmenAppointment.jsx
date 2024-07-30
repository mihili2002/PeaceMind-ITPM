import React, { useState, useEffect } from "react";
import "../styles/AppointmenAppointment.css";
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';

function AppointmenAppointment() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [appointmentsByDate, setAppointmentsByDate] = useState({});
  const navigate = useNavigate();

    // Fetch therapists when the component mounts
    useEffect(() => {
      // Axios GET request inside useEffect
      axios.get('http://localhost:8070/appointment/AppointmentgetTherapistsFullname')
        .then(response => {
          // Set therapists' names to the component's state
          setTherapists(response.data);
          console.log(response.data);
        })
        .catch(error => {
          // Handle errors occurred during the request
          console.error('There was a problem with the request:', error);
        });

        // Fetch appointments count by date
    axios.get('http://localhost:8070/appointment/appointmentsByDate')
    .then(response => {
      setAppointmentsByDate(response.data);
    })
    .catch(error => {
      console.error('Error fetching appointments by date:', error);
    });


    }, []);

    


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert('Name should only contain letters and spaces.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Invalid email format.');
      return;
    }

    if (!/^\d{10}$/.test(contactNo)) {
      alert('Contact number should be 10 digits.');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(appointmentDate);

    if (selectedDate < currentDate) {
      alert('Appointment date should be today or in the future.');
      return;
    }
// Log the form data before submitting
console.log("Form Data:", {
  name: name,
  address: address,
  ContactNo: contactNo,
  email: email,
  therapist: selectedTherapist,
  time: time,
  AppointmentDate: appointmentDate,
});

 // Check if the selected date has available slots
 const selectedApptDate = new Date(appointmentDate);
 const maxAppointmentsPerDate = 5; // Change this as needed
 if (appointmentsByDate[selectedApptDate.toISOString().split("T")[0]] >= maxAppointmentsPerDate) {
   alert('Sorry, all appointments for this date are booked. Please choose another date or join waitlist');
   return;
 }


    // If all validations pass, submit the form
    axios.post('http://localhost:8070/appointment/Appointmentadd', {
      name: name,
      address: address,
      ContactNo: contactNo,
      email: email,
      therapist: selectedTherapist,
      time: time,
      AppointmentDate: appointmentDate,
    })
    .then((res) => {
      // Send email confirmation
      sendEmailConfirmation(email);

      navigate("/AppointmenHistory");
      console.log(res);
    })
    .catch((err) => console.error(err));
  };

  // Function to send email confirmation
  const sendEmailConfirmation = (email) => {
    axios.post("http://localhost:8070/payment/Appointmentsend-email", { email })
      .then((response) => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="Appo">
      <h1>APPOINTMENT</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            pattern="[A-Za-z\s]+"
            title="Name should only contain letters and spaces."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNo">Contact-No:</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            required
            pattern="\d{10}"
            title="Contact number should be 10 digits."
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            pattern="\S+@\S+\.\S+"
            title="Invalid email format."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

       
        <div className="form-group">
         <label>
          Doctor Name:
          <select
  value={selectedTherapist}
  onChange={(e) => setSelectedTherapist(e.target.value)}
  style={{ marginLeft: '5px' }}
>
  <option value=""></option>
  {therapists.map((therapist, index) => (
    <option key={index} value={therapist}>
      {therapist}
    </option>
  ))}
</select>

        </label> 
        </div>

        <div className="form-group">
          <label htmlFor="time">Select a time:</label>
          <select name="time" id="time" onChange={(e) => setTime(e.target.value)} value={time}>
            <option value=""></option>
            <option value="9am-11am">9am-11pm</option>
            <option value="12pm-2pm">12pm-2pm</option>
            <option value="3pm-5pm">3pm-5pm</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Select a date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            required
            min={new Date().toISOString().split("T")[0]}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <button type="submit">APPOINTMENT</button>
        <button type="button"><Link to="/WaitlistForm"></Link>JOIN WAITLIST</button>
      </form>
    </div>
  );
}

export default AppointmenAppointment;
