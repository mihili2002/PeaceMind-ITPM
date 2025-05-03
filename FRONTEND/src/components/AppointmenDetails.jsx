import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AppointmenContentHeader from "./AppointmenContentHeader";
import "../styles/Appointmencontent.css";
import "../styles/AppointmenHistory.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Details() {
  const { id } = useParams();
  const [Details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAppointments = () => {
      axios
        .get("http://localhost:8070/appointment/Appointment")
        .then((res) => {
          setDetails(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getAppointments();
  }, []);

  const navigate = useNavigate();

  const deleteAppointment = (id) => {
    axios
      .delete(`http://localhost:8070/appointment/Appointmentdelete/${id}`)
      .then((response) => {
        alert("Details deleted successfully");
        setDetails(Details.filter((appointment) => appointment._id !== id));
        navigate("/AppointmenHistory");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Appointment History", 10, 10);

    let yPos = 20;
    filteredAppointments.forEach((appointment, index) => {
      yPos += 10;
      doc.text(`${index + 1}. Name: ${appointment.name}`, 10, yPos);
      yPos += 5;
      doc.text(`   Address: ${appointment.address}`, 10, yPos);
      yPos += 5;
      doc.text(`   Email: ${appointment.email}`, 10, yPos);
      yPos += 5;
      doc.text(`   Therapist: ${appointment.therapist}`, 10, yPos);
      yPos += 5;
      doc.text(`   Contact Number: ${appointment.ContactNo}`, 10, yPos);
      yPos += 5;
      doc.text(`   Date: ${formatDate(appointment.AppointmentDate)}`, 10, yPos);
      yPos += 5;
      doc.text(`   Time: ${appointment.time}`, 10, yPos);
      yPos += 10;
    });

    doc.save("AppointmentHistory.pdf");
  };

  // Format date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter appointments based on searched month
  const filteredAppointments = Details.filter((appointment) => {
    const appointmentMonth = new Date(appointment.AppointmentDate)
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    return appointmentMonth.includes(searchTerm);
  });

  return (
    <div className="content">
      <AppointmenContentHeader onSearch={handleSearch} />
      <div className="table-content">
        <h2 style={{ fontSize: "1.4em" }}>Appointment History</h2>
        <button
          className="bg-blue-500 text-white font-bold px-5 py-3 m-2"
          onClick={generatePDF}
        >
          Generate PDF
        </button>

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
            {filteredAppointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{index + 1}</td>
                <td>{appointment.name}</td>
                <td>{appointment.address}</td>
                <td>{appointment.email}</td>
                <td>{appointment.therapist}</td>
                <td>{appointment.ContactNo}</td>
                <td>{formatDate(appointment.AppointmentDate)}</td>
                <td>{appointment.time}</td>
                <td>
                  <button className="report-button">
                    <Link to={`/Appointmentupdate/${appointment._id}`}>
                      Edit
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => deleteAppointment(appointment._id)}
                    className="report-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
