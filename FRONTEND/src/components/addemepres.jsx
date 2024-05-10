import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import NavBar from "./navbar";
import "../styles/emeinsert.css";

export default function EmergencyApp() {
    const currentDate = new Date();
    const [names, setFname] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [dosage, setDosage] = useState([]);
    const [refills, setRefills] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const [medicine, setMedicine] = useState([]);

    const [options, setEmergency] = useState([]);
    const [Emergency, setEmergencys] = useState([]);
    const {name} = useParams();

    useEffect(() => {
        function getPre() {
       
            axios.get(`http://localhost:8070/Emergency/get/${name}`)
            .then((res) => {
              console.log(res.data.Emergency);
              setEmergencys(res.data.Emergency);
              
          
            })
            .catch((err) => {
              alert(err.message);
            });
        }
        getPre();
      }, []);
      
      

    useEffect(() => {
        function getEme() {

            axios.get(`http://localhost:8070/Avdoctor/`)
                .then((res) => {
                    console.log(res.data);
                    setEmergency(res.data.existingDoc);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getEme();
    }, []);
    //page refresh function

    function refreshPage() {
        window.location.reload(false);
    };



    //Creating new Appointment
    function sendData(s) {
        s.preventDefault();

        //Creating object
        const neweme = {
            names,
            doctor,
            dosage,
            refills,
            instructions,
            medicine,
            currentDate
    
        }

        //passing data to the DB
        axios.post("http://localhost:8070/EmergencyPre/save/", neweme).then(() => {

            alert("Emergency Prescription is successfully Added", refreshPage());
            console.log(neweme);
          
        }).catch((err) => {

            alert("Error: Emergency Prescription is unsuccessful");
            console.log(err);

        })

    }

    return (
        <div className="main-container">



            {/* <NavBar /> */}
            <div className="body-container clearfix" style={{ width: '50%', margin: 'auto', backgroundColor: '#f0eaea' }}>
                <center>
                    <h1>Medical Prescription.</h1>
                 
                </center>
                <form className="reg-form" onSubmit={sendData}>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='name-container'>
                                <label id="eSavelabel" className="eme-full-name">Patient Name:</label><br /> 
                                <input type="text" id="emesave" className="eme-name" name="names" placeholder="Enter patient name" onChange={(event) => {
                                    setFname(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label id="eSavelabel" for="eme-doctor">Doctor Name:</label><br />
                                <select  id="emesave" className="eme-doctor" name="doctor"  onChange={(event) => {
                                    setDoctor(event.target.value);
                                }} required >
                                 <option value=""> Doctors</option>
                                    {options && options.filter(options =>
                                    
                                        options.status && options.status.toLowerCase() === "available"
                                    ).map((option, index) => (
                                        // {options.map(option => (
                                        <option key={option.name} value={option.name}>{option.name}</option>
                                    ))}
                                </select>
                            </div><br />
                        </div>
                    </div>

                
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='e-container'>
                                <label id="eSavelabel" className="eme-email">Dosage:</label><br /> 
                                <input type="text" id="emesave" className="eme-dosage" name="dosage" placeholder="EnterDosage (e.g 500g)"  onChange={(event) => {
                                    setDosage(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label id="eSavelabel" for="eme-contact">Refills:</label><br />
                                <input type="text" id="emesave" className="eme-refills" name="refills" onChange={(event) => {
                                    setRefills(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                        <div className='reason-container'>
                                <label  id="eSavelabel" for="eme-medicine">Medicine:</label><br />
                                <textarea id="emeStext" className="eme-medicine" name="medicine" onChange={(event) => {
                                    setMedicine(event.target.value);
                                }} required />
                            </div><br />
                          
                        </div>
                        <div className="form-col" id="fcoll">
                        <div className='time-container'>
                                <label id="eSavelabel" className="eme-age">Instructions:</label> <br/>
                                <input type="text" id="emesave" className="eme-instructions" name="instructions"  onChange={(event) => {
                                    setInstructions(event.target.value);
                                }} required />
                            </div><br />




                        </div>
                    </div>

                    {/* <div className='category-container'>
              <label for="eme-category"><b>What is the health Category</b></label><br/> 
              <input type="text" id="category" className="eme-category" name="category"  onChange={(event)=>{
                  setCategory(event.target.value);
              }} required/>
              </div><br/> */}
                   

                 

                   
                   





< center>
            <input type="submit" id="joinBtn" value="SUBMIT"></input><br /><br />
            </center>

        </form>
        </div >
            </div >



   


    );
}
