import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function User() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/client/User")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/client/deleteUser/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleGeneratePDF = () => {
    const table = document.querySelector("#pdfTable");

    if (!table) {
      console.error("Table element with ID 'pdfTable' not found.");
      return;
    }

    html2canvas(table)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("user_details.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8070/client/searchUserByName", {
        params: { name: searchQuery },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-5 text-center">
      <input
        type="text"
        placeholder="Search by name..."
        className="bg-gray-200 border-2 border-gray-300 rounded py-2 px-4 m-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white font-bold px-5 py-3 m-2"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="bg-blue-500 text-white font-bold px-5 py-3 m-2"
        onClick={handleGeneratePDF}
      >
        Generate PDF
      </button>
      <table id="pdfTable" className='mx-auto border-collapse border border-gray-800 rounded-lg shadow-lg bg-blue-100'>
  <thead>
    <tr>
      <th className='border border-gray-800 p-2'>Email</th>
      <th className='border border-gray-800 p-2'>Name</th>
      <th className='border border-gray-800 p-2'>Age</th>
      <th className='border border-gray-800 p-2'>Address</th>
      <th className='border border-gray-800 p-2'>NIC</th>
      <th className='border border-gray-800 p-2'>Gender</th>
      <th className='border border-gray-800 p-2'>Password</th>
      <th className='border border-gray-800 p-2'>Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user._id}>
        <td className='border border-gray-800 p-2'>{user.email}</td>
        <td className='border border-gray-800 p-2'>{user.name}</td>
        <td className='border border-gray-800 p-2'>{user.age}</td>
        <td className='border border-gray-800 p-2'>{user.address}</td>
        <td className='border border-gray-800 p-2'>{user.nic}</td>
        <td className='border border-gray-800 p-2'>{user.gender}</td>
        <td className='border border-gray-800 p-2'>{user.password}</td>
        <td className='border border-gray-800 p-2'>
          <Link className='bg-green-700 text-white font-bold px-3 py-1 m-1' to={`/Clientupdate/${user._id}`}>Update</Link>
          <button className='bg-red-700 text-white font-bold px-3 py-1 m-1' onClick={() => handleDelete(user._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
export default User;
