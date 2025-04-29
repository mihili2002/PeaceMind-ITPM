// WaitlistHistory.js

import React, { useState, useEffect } from 'react';
import '../styles/Waitlistcontent.css';
import ContentHeader from './WaitlistContentHeader';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Update from './EditWaitlistForm';

export default function WaitlistHistory() {
  const { id } = useParams();
  const [waitlistHistory, setWaitlistHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    function getWaitlists() {
      axios.get('http://localhost:8070/waitlist/')
        .then((res) => {
          setWaitlistHistory(res.data);
        }).catch((err) => {
          alert(err.message);
        });
    }
    getWaitlists();
  }, []);

  const navigate = useNavigate();

  const deleteWaitlist = (id) => {
    console.log("Deleting waitlist with ID:", id);
    axios.delete(`http://localhost:8070/waitlist/delete/${id}`)
      .then(Response => {
        alert('Waitlist deleted successfully');
        setWaitlistHistory(waitlistHistory.filter(waitlist => waitlist._id !== id)); // Here is the issue
        navigate('/');
      }).catch(error => {
        console.error('There was an error!', error);
      });
  };

  // Filter waitlist history based on search term
  const filteredWaitlistHistory = waitlistHistory.filter(waitlist =>
    waitlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to format date in YYYY-MM-DD format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="content">
      <div className="table-content">
        <h2>Waitlist Patients History</h2>
        {/* Search input */}
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search for Waitlist Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Preferred Doctor</th>
              <th>Date</th>
              <th>Session Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredWaitlistHistory) && filteredWaitlistHistory.map((waitlist, index) => (
              <tr key={waitlist._id}>
                <td>{index + 1} </td>
                <td>{waitlist.name}</td>
                <td>{waitlist.address}</td>
                <td>{waitlist.email}</td>
                <td>{waitlist.contact_number}</td>
                <td>{waitlist.Preferred_Doctor}</td>
                <td>{formatDate(waitlist.waitlistDate)}</td>
                <td>{waitlist.Session_Time}</td>
                <td>
  <button onClick={() => window.location.href=`/update/${waitlist._id}`}>
    Edit
  </button>
</td>
                <td><button type="button" onClick={() => deleteWaitlist(waitlist._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
