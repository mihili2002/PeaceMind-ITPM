// import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'
import { Link } from "react-router-dom";


const TABLE_HEAD = ["Name", "Address", "Contact No", "Email", "Time", "Date", "Action","Thoughtlog"];

export default function DefaultTable() {
  const [appointments, setAppointments] = useState([]);
  const [users,setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Decode the token to get user ID

  const handleConfirm = (rowData, index) => {
    // console.log("Data to be sent to server:", rowData);

    axios
      .post("http://localhost:8070/therapist/createTherapySession", rowData)
      .then((res) => {
        // console.log("Therapy session created:", res.data);
        // Show alert when therapy session is successfully created
        alert("Therapy session created successfully!");
        // Update the button properties
        const updatedAppointments = [...appointments];
        updatedAppointments[index] = { ...rowData, disabled: true, buttonColor: "red", buttonText: "Confirmed" };
        setAppointments(updatedAppointments);

        // Move confirmed appointment to CompletedAppointments table
        axios.post("http://localhost:8070/therapist/completedAppointments", rowData)
          .then((res) => {
            // console.log("Appointment moved to CompletedAppointments:", rowData);
          })
          .catch((err) => console.error("Error moving appointment to CompletedAppointments:", err));

        // Delete confirmed appointment from appointments table
        axios.delete(`http://localhost:8070/therapist/deleteAppointment/${rowData._id}`)
          .then((res) => {
            // console.log("Appointment deleted:", rowData);
            // Refresh appointments list after deletion
            setAppointments(appointments.filter(appointment => appointment._id !== rowData._id));
          })
          .catch((err) => console.error("Error deleting appointment:", err));
      })
      .catch((err) => console.error("Error creating therapy session:", err));
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/getAppointments/" + decodedToken.fullname)
  //     .then((res) => {
  //       console.log(res);
  //       const appointmentsData = res.data.map(appointment => ({
  //         ...appointment,
  //         buttonText: "Confirm",
  //         disabled: false, // Initially, buttons are enabled
  //         buttonColor: "blue", // Initially, buttons are blue
  //       }));
  //       setAppointments(appointmentsData);
  //     })
  //     .catch((err) => console.error(err));
  // }, [decodedToken]);
  useEffect(() => {
    axios.get('http://localhost:8070/therapist/getAppointments/' + decodedToken.fullname)
      .then(res => {
        console.log(res);
        setUsers(res.data); 
      })
      .catch(err => console.error(err));
  }, [decodedToken]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:8070/therapist/searchByName?name=${searchTerm}`)
      .then((res) => {
        // console.log(res);
        setAppointments(res.data);
      })
      .catch((err) => console.error(err));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-end my-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          color="blue"
          size="regular"
          className="ml-2"
        >
          Search
        </Button>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={index}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-blue-800 font-bold"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((row, index, array) => {
            const isLast = index === array.length - 1;
            const classes = isLast
              ? "p-4 bg-blue-100"
              : "p-4 border-b border-blue-gray-50 bg-blue-100";

            return (
              <tr key={row._id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-blue-700"
                  >
                    {row.name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-blue-700"
                  >
                    {row.address}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-blue-700"
                  >
                    {row.ContactNo}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-blue-700"
                  >
                    {row.email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-blue-700"
                  >
                    {row.time}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-blue-700"
                  >
                    {formatDate(new Date(row.AppointmentDate).toLocaleDateString())}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex space-x-2">
                    { 
                    <Button
                      onClick={() => handleConfirm(row, index)}
                      variant="filled"
                      // color={row.buttonColor}
                      // textColor="white"
                      // disabled={row.disabled}
                    >
                      {/* {row.buttonText} */}
                      completed
                    </Button> }                    
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-blue-700"
                  >
                    <button>
                      <Link to={`/TherapistViewThought/${row.email}`}>View</Link>
                    </button>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
