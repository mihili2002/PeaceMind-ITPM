import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AppointmenContentHeader from './AppointmenContentHeader'
import '../styles/Appointmencontent.css'
// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";


export default function Details() {
  const { id } = useParams();
  const [Details, setDetails] = useState([]);

  useEffect(() => {
    const getappoinment = () => {
      axios.get('http://localhost:8070/appointment/Appointment')
        .then((res) => {
          setDetails(res.data);

        }).catch((err) => {
          alert(err.message);
        })
    };

    getappoinment();
  }, []);

  const navigate = useNavigate();

  const deleteappoinment = (id) => {
    
    axios.delete(`http://localhost:8070/appointment/Appointmentdelete/${id}`)
      .then(Response => {
        alert('Details deleted successfully');
        setDetails(Details.filter(appoinments => appoinments._id !== id));
        navigate('/AppointmenHistory');
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
      <AppointmenContentHeader />
      <div className="table-content">
      <h2 style={{ fontSize: '1.4em' }}>Appointment History</h2>       
       <Link to="/PaymentUser/PaymentContent" style={{ fontSize: '1.4em' ,color: 'white', backgroundColor: '#8ab8da', padding: '5px 10px', borderRadius: '5px', textDecoration: 'none' }}>Payment</Link>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            <th>Address</th>
              <th>Email</th>
              <th>Therapist</th>
              <th>Contact Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Edit</th>
              <th>Delete</th>
             
              
            </tr>
          </thead>
          <tbody>
            {Details.map((appoinments, index) => (
              <tr key={appoinments.id}>
                <td>{index + 1}</td>
                <td>{appoinments.name}</td>
               <td>{appoinments.address}</td>
                <td>{appoinments.email}</td>
                <td>{appoinments.therapist}</td>
                <td>{appoinments.ContactNo}</td>
                <td>{formatDate(appoinments.AppointmentDate)}</td>
                <td>{appoinments.time}</td>
                <td><button className="report-button"><Link to={`/Appointmentupdate/${appoinments._id}`}>Edit</Link></button></td>
                <td><button type="button" onClick={() => deleteappoinment(appoinments._id)}className="report-button">Delete</button></td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


