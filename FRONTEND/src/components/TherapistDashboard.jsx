import React from 'react';
import TherapistSidebar from './TherapistSidebar';
import { Link } from 'react-router-dom';
import peaceOfMindImage from '../images/peace-of-mind.jpg'; // Import the image

const Dashboard = () => {
  return (
    <div className="dashboard flex">
      <TherapistSidebar />
      <div className='dashboard-content flex flex-col justify-center items-center'>
        
        <h2 className="text-2xl font-bold mb-2">Welcome to Peace of Mind</h2>
        <p className="text-lg mb-4">Get Help. Get Better.</p>
        <img src={peaceOfMindImage} alt="Peace of Mind" className="mb-4 rounded-lg" style={{ width: '400px', height: 'auto' }} />

        <div className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
            <Link to={'/TherapistAdmin'}>All Therapists Details</Link>
          </button>
          {/* <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full">
            <Link to={'/TherapistAddTherapist'}>Add New Therapist</Link>
          </button> */}
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
