import React, { useState, useEffect } from "react";
import axios from "axios";
// import NavBar from "./navbar";
import { useParams } from "react-router-dom";

export default function Doc() {
    const [emergency, setEmergency] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

   

  
    const {names} = useParams();

    useEffect(() => {
        function getPre() {
       
            axios.get(`http://localhost:8070/EmergencyPre/get/${names}`)
            .then((res) => {
              console.log(res.data);
              setEmergency(res.data.Emergency);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
        getPre();
      }, []);





    const searchAppointment = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="main-container">
            <div className="body-container clearfix">
                <div className="order-section-one-container ">
                    <div className="order-section-one-left ">
                        <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
                            Emergency Prescription details
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
                                <th className="order-table-header-col-1" scope="col">Doctor</th>
                                <th className="order-table-header-col-1" scope="col">Dosage</th>
                                <th className="order-table-header-col-1" scope="col">Medicine</th>
        
                                <th className="order-table-header-col-1" scope="col">Date</th>
                                <th className="order-table-header-col-1" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emergency && emergency.filter((e) =>
                                e.names.includes(searchQuery) ||

                                e.names.toLowerCase().includes(searchQuery)
                            ).map((e, index) => (
                                <tr key={e._id} className="order-table-row">
                                    <th className="order-table-col-1" scope="row">{index + 1}</th>
                                    <td className="order-table-col-1">{e.names}</td>
                                    <td className="order-table-col-1">{e.doctor}</td>
                                    <td className="order-table-col-1">{e.dosage}</td>
                                    <td className="order-table-col-1">{e.medicine}</td>

                                    <td className="order-table-col-1">{e.currentDate ? e.currentDate.split('T')[0] : ''}</td>
                                    <td id="action-button">
                                        <a href={"/vip/" + e._id} style={{ textDecoration: 'none' }}>
                                            <button id="table-button" className="btn btn-outline-info btn-sm">
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
            <button className="btn btn-success"><a href={"/addemepre/"+names} style={{textDecoration:'none',color:'white'}}>Add New prescription</a></button>
              
        </div>
    );
}
