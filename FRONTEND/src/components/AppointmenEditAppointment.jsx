import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditAppointment() {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [therapist, setTherapist] = useState('');
  const [time, setTime] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const navigator = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8070/appointment/Appointmentget/${id}`)
      .then(res => {
        const { name, address, ContactNo, email,therapist, time, AppointmentDate } = res.data.appointment;
        setName(name);
        setAddress(address);
        setContactNo(ContactNo);
        setEmail(email);
        setTherapist(therapist);
        setTime(time);
        setAppointmentDate(AppointmentDate);
      })
      .catch(err => console.error(err));
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    // Add form validations here
    axios.put(`http://localhost:8070/appointment/Appointmentupdate/${id}`, {
      name,
      address,
      ContactNo: contactNo,
      email,
      therapist:therapist,
      time,
      AppointmentDate: appointmentDate,
    })
      .then((res) => {
        navigator("/AppointmenHistory");
        console.log(res);
        alert('Details updated successfully');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="Appo">
      <h1>APPOINTMENT</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
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
          <label htmlFor="contactNo">Contact No:</label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            required
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="therapist">Select a therapist:</label>
          <select name="therapist" id="therapist" onChange={(e) => setTherapist(e.target.value)} value={therapist} disabled>
            <option value=""></option>
            <option value="Dr.Fernando">Dr.Fernando</option>
            <option value="Dr.Perara">Dr.Perera</option>
            <option value="Dr.Stephani">Dr.Stephani</option>
            <option value="Dr.Collin">Dr.Collin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">Select a time:</label>
          <select name="time" id="time" onChange={(e) => setTime(e.target.value)}>
            <option value=""></option>
            <option value="9am-11am">9am-11am</option>
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
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
}

export default EditAppointment;
