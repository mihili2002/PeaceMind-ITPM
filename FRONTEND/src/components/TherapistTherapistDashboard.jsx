import React from 'react';
import TherapistSidebar from './TherapistSidebar';
import { Link } from 'react-router-dom';
import therapistImage from '../images/therapist2.jpeg'; // Import the image
import {jwtDecode} from 'jwt-decode'

const TherapistDashboard = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Decode the token to get user ID
  return (
    <div className="dashboard flex">
      <TherapistSidebar />
      <div className='dashboard-content flex flex-col justify-center items-center'>
        <h2 className="text-2xl font-bold mb-2">Welcome, Therapist!</h2>
        <p className="text-lg mb-4">Manage your therapy sessions here.</p>
    
        <div className="flex">
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
    <Link to={`/TherapistAppoinment/${decodedToken.fullname}`}>View Appointments</Link>
  </button>
  <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full mr-2">
    <Link to={'/TherapistEmergencyAppoinments'}>View Emergency Appointments</Link>
  </button>
  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
    <Link to={'/TherapistPrehandling'}>Prescription Handling</Link>
  </button>
</div>

        <img src={therapistImage} alt="Therapist" className="mb-4 rounded-lg" style={{ maxWidth: '100%', height: 'auto' }} />

      </div>
    </div>
  );
}

export default TherapistDashboard;
