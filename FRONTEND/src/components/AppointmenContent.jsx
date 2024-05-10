
import React from 'react';
import AppointmenContentHeader from './AppointmenContentHeader'
import AppointmenCard from './AppointmenCard';
import '../styles/Appointmencontent.css';
import { Link } from 'react-router-dom';



const Content = () => {
  return (
    <div className="content">
      <AppointmenContentHeader />
      <AppointmenCard />
      <Link className="Appointment-button" to="/AppointmenAppointment"> Make an Appointment</Link>

      
    </div>
    
  );
};

export default Content;
