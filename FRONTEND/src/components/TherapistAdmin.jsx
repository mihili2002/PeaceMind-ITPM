import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function Admin() {
  const [therapists,settherapists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8070/therapist/details')
    .then(res => {
      console.log(res);
      settherapists(res.data); 
    })
    .catch(err => console.error(err));
  },[]);

  const handleDelete = (id) => {
    axios.delete('http://localhost:8070/therapist/deleteUser/' + id)
    .then(res => {
      window.location.reload();
    })
    .catch(err => console.error(err));
  }

  // const handleGeneratePDF = () => {
  //   axios.get('http://localhost:3000/generatePDF', { responseType: 'blob' })
  //     .then(res => {
  //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  //       saveAs(pdfBlob, 'user_details.pdf');
  //     })
  //     .catch(err => console.error(err));
  // }
 
  const handleGeneratePDF = () => {
    const table = document.querySelector("#pdfTable");

    if (!table) {
      console.error("Table element with ID 'pdfTable' not found.");
      return;
    }

    html2canvas(table)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("user_details.pdf");
      })
      .catch(error => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div className='p-5 text-center'>
  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4' onClick={handleGeneratePDF}>Generate PDF</button>
  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mb-4">
    <Link to={'/TherapistDashboard'}>Back</Link>
  </button>
  <table id="pdfTable" border="1" className='w-[70vw] bg-blue-100 mx-auto'>
    <thead>
      <tr>
        <th className="px-4 py-2">Full Name</th>
        <th className="px-4 py-2">Email</th>
        <th className="px-4 py-2">NIC</th>
        <th className="px-4 py-2">Gender</th>
        <th className="px-4 py-2">DOB</th>
        <th className="px-4 py-2">Phone</th>
        <th className="px-4 py-2">Password</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {therapists.map((therapist) => (
        <tr key={therapist._id}>
          <td className="px-4 py-2">{therapist.fullname}</td>
          <td className="px-4 py-2">{therapist.email}</td>
          <td className="px-4 py-2">{therapist.nic}</td>
          <td className="px-4 py-2">{therapist.gender}</td>
          <td className="px-4 py-2">{therapist.dob}</td>
          <td className="px-4 py-2">{therapist.phone}</td>
          <td className="px-4 py-2">{therapist.password}</td>
          <td className="px-4 py-2">
            // Updated button to grey color
         <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-full' onClick={(e) => handleDelete(therapist._id)}>Delete</button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default Admin;
