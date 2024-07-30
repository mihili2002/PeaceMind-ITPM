import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import NavBar from "./navbar"
import "../styles/emeinsert.css";

export default function EmergencyApp() {
    const { id } = useParams();
    const [names, setFname] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [dosage, setDosage] = useState([]);
    const [refills, setRefills] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const [medicine, setMedicine] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8070/EmergencyPre/`+id).then((res) => {
        setFname(res.data.Emergency.names);
        setDoctor(res.data.Emergency.doctor);
        setDosage(res.data.Emergency.dosage);
        setRefills(res.data.Emergency.refills);
        setInstructions(res.data.Emergency.instructions);
        setMedicine(res.data.Emergency.medicine);
      
    });
  }, []);



    //page refresh function

    function refreshPage() {
        window.location.reload(false);
    };



 
        

    return (
        <div className="main-container">

< br/>

<div className="body-container clearfix" style={{ width: '50%', margin: 'auto', backgroundColor: '#f0eaea' }}>
                <center>
                    <h1>Medical Prescription.</h1>
                 
                </center>
                <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='name-container'>
                                <label id="eSavelabel" className="eme-full-name">Patient Name:</label><br /> 
                                <input type="text" id="emesave" className="eme-name" name="names" value= {names} onChange={(event) => {
                                    setFname(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label id="eSavelabel" for="eme-doctor">Doctor Name:</label><br />
                                <input type="text" id="emesave" className="eme-doctor" name="doctor" value={doctor} onChange={(event) => {
                                    setDoctor(event.target.value);
                                }} required />
                            </div><br />
                          
                        </div>
                    </div>

                
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='e-container'>
                                <label id="eSavelabel" className="eme-email">Dosage:</label><br /> 
                                <input type="text" id="emesave" className="eme-dosage" name="dosage" value= {dosage}  onChange={(event) => {
                                    setDosage(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label id="eSavelabel" for="eme-contact">Refills:</label><br />
                                <input type="text" id="emesave" className="eme-refills" name="refills"  value= {refills}  onChange={(event) => {
                                    setRefills(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                        <div className='reason-container'>
                                <label  id="eSavelabel" for="eme-medicine">Medicine:</label><br />
                                <textarea id="emeStext" className="eme-medicine" name="medicine" value= {medicine} onChange={(event) => {
                                    setMedicine(event.target.value);
                                }} required />
                            </div><br />
                          
                        </div>
                        <div className="form-col" id="fcoll">
                        <div className='time-container'>
                                <label id="eSavelabel" className="eme-age">Instructions:</label> <br/>
                                <input type="text" id="emesave" className="eme-instructions" name="instructions" value= {instructions} onChange={(event) => {
                                    setInstructions(event.target.value);
                                }} required />
                            </div><br />




                        </div>
                    </div>








        </div >
            </div >



   


    );
}