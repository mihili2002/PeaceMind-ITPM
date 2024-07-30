import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AppointmenContentHeader from './AppointmenContentHeader';
import jsPDF from 'jspdf';

export default function AppointmenAdminTable() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getAppointments = () => {
      axios.get(`http://localhost:8070/appointment/Appointment`)
        .then((res) => {
          setDetails(res.data);
          setSearchResults(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getAppointments();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = details.filter(appointment =>
      appointment.name.toLowerCase().includes(term) ||
      appointment.AppointmentDate.toLowerCase().includes(term) // Search by month
    );
    setSearchResults(results);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Appointment History", 10, 10);

    let yPos = 20;
    searchResults.forEach((appointment, index) => {
      yPos += 10;
      doc.text(`${index + 1}. Name: ${appointment.name}`, 10, yPos);
      yPos += 5;
      doc.text(`   Address: ${appointment.address}`, 10, yPos);
      yPos += 5;
      doc.text(`   Email: ${appointment.email}`, 10, yPos);
      yPos += 5;
      doc.text(`   Therapist: ${appointment.therapist}`, 10, yPos);
      yPos += 10;
      doc.text(`   Contact Number: ${appointment.ContactNo}`, 10, yPos);
      yPos += 5;
      doc.text(`   Date: ${appointment.AppointmentDate}`, 10, yPos);
      yPos += 5;
      doc.text(`   Time: ${appointment.time}`, 10, yPos);
      yPos += 10;
    });

    doc.save("AppointmentHistory.pdf");
  };

   // Function to format date in YYYY-MM-DD format
   const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="content">
      <AppointmenContentHeader onSearch={handleSearch} />
      <div className="table-content">
        <h2>Appointment History</h2>
        <button className='bg-blue-500 text-white font-bold px-5 py-3 m-2' onClick={generatePDF}>Generate PDF</button>

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
              
            </tr>
          </thead>
          <tbody>
            {searchResults.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.name}</td>
                <td>{appointment.address}</td>
                <td>{appointment.email}</td>
                <td>{appointment.therapist}</td>
                <td>{appointment.ContactNo}</td>
                <td>{formatDate(appointment.AppointmentDate)}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
