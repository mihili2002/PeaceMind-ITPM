import React, { useState, useEffect } from "react";
import axios from "axios";
// import NavBar from "./navbar";
import { useParams } from "react-router-dom";

export default function Doc() {
    const [emergency, setEmergency] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getEmergency();
    }, []);

    function getEmergency() {
        axios.get(`http://localhost:8070/Emergency/`)
            .then((res) => {
                setEmergency(res.data.existingProject);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

  





    const searchAppointment = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="main-container">
            <div className="body-container clearfix">
                <div className="order-section-one-container ">
                    <div className="order-section-one-left ">
                        <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
                            Emergency Appointment details
                        </h3>
                    </div>
                    <div className="order-section-one-right">
                        <input onChange={searchAppointment} type="search" placeholder="Search" className="search-box" />
                    </div>
                </div>

                <div className="order-section-two-container">
                    <table className="table">
                        <thead id="app-table">
                            <tr>
                                <th className="order-table-header-col-1" scope="col">Number</th>
                                <th className="order-table-header-col-1" scope="col">Name</th>
                                <th className="order-table-header-col-1" scope="col">Age</th>
                                <th className="order-table-header-col-1" scope="col">Contact No</th>
                                <th className="order-table-header-col-1" scope="col">Email</th>
                                <th className="order-table-header-col-1" scope="col">Gender</th>
                                <th className="order-table-header-col-1" scope="col">Doctor</th>
                                <th className="order-table-header-col-1" scope="col">Category</th>
                                <th className="order-table-header-col-1" scope="col">Reason</th>
                                <th className="order-table-header-col-1" scope="col">Date</th>
                                <th className="order-table-header-col-1" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emergency && emergency.filter((e) =>
                                e.name.includes(searchQuery) ||
                                e.age.includes(searchQuery) ||
                                e.name.toLowerCase().includes(searchQuery)
                            ).map((e, index) => (
                                <tr key={e._id} className="order-table-row">
                                    <th className="order-table-col-1" scope="row">{index + 1}</th>
                                    <td className="order-table-col-1">{e.name}</td>
                                    <td className="order-table-col-1">{e.age}</td>
                                    <td className="order-table-col-1">{e.contact}</td>
                                    <td className="order-table-col-1">{e.email}</td>
                                    <td className="order-table-col-1">{e.gender}</td>
                                    <td className="order-table-col-1">{e.doctor}</td>
                                    <td className="order-table-col-1">{e.category}</td>
                                    <td className="order-table-col-1">{e.reason}</td>
                                    <td className="order-table-col-1">{e.currentDate ? e.currentDate.split('T')[0] : ''}</td>
                                    <td id="action-button">
                                        <a href={"/dopall/" + e.name} style={{ textDecoration: 'none' }}>
                                            <button id="table-button" className="btn btn-outline-primary btn-sm">
                                                <i className="fas fa-edit"></i>&nbsp;View
                                            </button>
                                        </a>
                                        &nbsp;
                                        
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
