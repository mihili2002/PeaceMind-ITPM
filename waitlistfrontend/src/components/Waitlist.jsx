import React, { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate } from 'react-router-dom';

export default function Waitlist() {
   // Define state variables for form fields
   const [name, setName] = useState('');
   const [address, setAddress] = useState('');
   const [email, setEmail] = useState('');
   const [contactNumber, setContactNumber] = useState('');
   const [preferredDoctor, setPreferredDoctor] = useState('');
   const [date, setDate] = useState('');

   // Define navigate function from useNavigate hook
   const navigate = useNavigate();

   // Define function to handle form submission
   function handleSubmit(e) {
      e.preventDefault();

      // Create a FormData object to store form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('email', email);
      formData.append('contactNumber', contactNumber);
      formData.append('preferredDoctor', preferredDoctor);
      formData.append('date', date);

      // Send POST request to server
      axios.post("http://localhost:8070/waitlist/add", formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
      .then(() => {
         // If successful, show alert and clear form fields
         alert("Waitlist added successfully!");
         setName('');
         setAddress('');
         setEmail('');
         setContactNumber('');
         setPreferredDoctor('');
         setDate('');

         // Redirect to WaitlistHistory component
         navigate(`/WaitlistHistory`);
      })
      .catch((err) => {
         // If an error occurs, show alert with error message
         alert("Failed to add waitlist: " + err);
      });
   }

   return (
      <div>
         <h1 className="lg:mx-32 mb-5 text-5xl font-bold flex items-center justify-center flex-col text-black-500">Patient Waitlist</h1>

         <div className="mt-5 flex items-center justify-center flex-col">
            <section className="w-full lg:w-1/2">
               <form onSubmit={handleSubmit}>
                  {/* Form fields */}
                  {/* Name */}
                  <div className="mb-4">
                     <label htmlFor={name} className="block mb-3 text-lg font-large text-white-900 dark:text-white">Name</label>
                     <input onChange={(e) => setName(e.target.value)} type="text" id="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
                  </div>
                  {/* Address */}
                  <div className="mb-4">
                     <label htmlFor={address} className="block mb-3 text-lg font-large text-white-900 dark:text-white">Address</label>
                     <input onChange={(e) => setAddress(e.target.value)} type="text" id="Address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
                  </div>
                  {/* Email */}
                  <div className="mb-4">
                     <label htmlFor={email} className="block mb-3 text-lg font-large text-white-900 dark:text-white">Email</label>
                     <input onChange={(e) => setEmail(e.target.value)} type="email" id="Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                  </div>
                  {/* Contact Number */}
                  <div className="mb-4">
                     <label htmlFor={contactNumber} className="block mb-3 text-lg font-large text-white-900 dark:text-white">Contact Number</label>
                     <input onChange={(e) => setContactNumber(e.target.value)} type="text" id="ContactNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
                  </div>
                  {/* Preferred Doctor */}
                  <label htmlFor={preferredDoctor} className="block mb-2 text-lg font-large text-white-900 dark:text-white">Preferred Doctor</label>
                  <select onChange={(e) => setPreferredDoctor(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={preferredDoctor} name={preferredDoctor} value={preferredDoctor}>
                     <option selected>Choose a doctor</option>
                     <option value="US">Dr.Samaraweera</option>
                     <option value="CA">Dr.Jayasingha</option>
                     <option value="FR">Dr.Kamal</option>
                     <option value="DE">Dr.Sunimal</option>
                  </select>
                  {/* Date */}
                  <div className="mb-4">
                     <label htmlFor={date} className="block mb-3 text-lg font-large text-white-900 dark:text-white">Date</label>
                     <input onChange={(e) => setDate(e.target.value)} type="date" id="Date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
                  </div>

                  {/* Submit Button */}
                  <div className="mb-10"></div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                  
                     <Link to={'/WaitlistHistory'}><button
                        type="submit" // Specify type as submit
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-large font-extrabold rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        style={{ width: '50%' }}
                     >
                        Join Waitlist
                     </button>
                     </Link>  
                  </div>
               </form>
            </section>
         </div>
      </div>
   );
}
