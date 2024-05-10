import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://localhost:8070/therapist/getAllEmergencyAppointments')
      .then(response => {
        setAppointments(response.data);;
        console.log('f',response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      
      <h2>Emergency Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Doctor</th>
            <th>Currently</th>
            <th>Category</th>
            <th>Reason</th>
            <th>Current Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.age}</td>
              <td>{appointment.email}</td>
              <td>{appointment.contact}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.currently}</td>
              <td>{appointment.category}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.currentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
