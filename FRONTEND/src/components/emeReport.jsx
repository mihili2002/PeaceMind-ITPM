import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import axios from "axios";

import { useParams } from "react-router-dom";

import "../styles/retrivetable.css";
import "../styles/emeheader.css";
export default function Doc() {
  

  const [Emergency, setEmergency] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Emergency-data',
    onAfterPrint: () => alert('Print Success')

  });

  useEffect(() => {
    function getEme() {

      axios.get(`http://localhost:8070/Emergency/`)
        .then((res) => {
          console.log(res.data);
          setEmergency(res.data.existingProject);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getEme();
  }, []);






  const [serQuary, setSerQuary] = useState("");

  function searchAppointment(event) {

    setSerQuary(event.target.value);

  }



  return (
    <div className="main-container">
      <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>

        <div className="body-container clearfix">

          <div className="order-section-one-container ">
            <div className="order-section-one-left ">
              <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
                Today Emergency Appoinments
              </h3>
            </div>
            <div className="order-section-one-right">
              <input onChange={searchAppointment} type="search" placeholder="Search" className="search-box" />
            </div>

          </div>

          <div className="order-section-two-container">


            <table Class="table">
              <thead id="app-table">

                <tr >


                  <th className="order-table-header-col-1" scope="col">Number</th>
                  <th className="order-table-header-col-1" scope="col">Name</th>
                  <th className="order-table-header-col-1" scope="col">Age</th>
                  <th className="order-table-header-col-1" scope="col">Contact No</th>
                  <th className="order-table-header-col-1" scope="col">Email</th>
                  <th className="order-table-header-col-1" scope="col">Gender</th>
                  <th className="order-table-header-col-1" scope="col">Doctor </th>
                  <th className="order-table-header-col-1" scope="col">Category </th>
                  <th className="order-table-header-col-1" scope="col">Reason </th>
                  <th className="order-table-header-col-1" scope="col">Date </th>

                </tr>

              </thead>

              <tbody>

                {Emergency && Emergency.filter(emergency => {

                  // Emergency.currentDate && Emergency.currentDate.includes(serQuary)||

                  emergency &&emergency.name.includes(serQuary) ||
                  emergency && emergency.doctor.includes(serQuary)
                  //   Emergency.name.toLowerCase().includes(serQuary)
                  const current = new Date();
                  const currentDate = `${current.getFullYear()}-${(current.getMonth() + 1).toString().padStart(2, '0')}-${current.getDate().toString().padStart(2, '0')}`;
                  return (
                    (emergency.currentDate && emergency.currentDate.split('T')[0].toLowerCase() === currentDate) &&
                    (emergency.name.toLowerCase().includes(serQuary.toLowerCase()) || emergency.doctor.toLowerCase().includes(serQuary.toLowerCase()))
                  );
                }).map((e, index) => (

                  <tr className="order-table-row">

                    <th className="order-table-col-1" scope="row">{index + 1}</th>


                    <td className="order-table-col-1">{e.name}</td>
                    <td className="order-table-col-1">{e.age}</td>
                    <td className="order-table-col-1">{e.contact}</td>
                    <td className="order-table-col-1">{e.email}</td>
                    <td className="order-table-col-1">{e.gender}</td>
                    <td className="order-table-col-1">{e.doctor}</td>
                    <td className="order-table-col-1">{e.category}</td>
                    <td className="order-table-col-1">{e.reason}</td>
                    <td className="order-table-col-1">{e.currentDate.split('T')[0]}</td>


                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <button onClick={handlePrint}>Print this out</button>
        </div>
      </div>
    </div>

  );
} 