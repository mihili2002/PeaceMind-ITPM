import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
//import NavBar from "./navbar";
import "../styles/emeinsert.css";

export default function EmergencyApp() {
    const { id } = useParams();
    const [name, setFname] = useState([]);
    const [age, setAge] = useState([]);
    const [email, setEmail] = useState([]);
    const [contact, setContact] = useState([]);
    const [gender, setGender] = useState([]);
    const [currently, setCurrently] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [reason, setReason] = useState([]);
    const [category, setCategory] = useState([]);
    const [options, setEmergency] = useState([])
    const navigate = useNavigate();
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

  useEffect(() => {
    axios.get(`http://localhost:8070/Emergency/`+id).then((res) => {
        setFname(res.data.Emergency.name);
        setAge(res.data.Emergency.age);
        setEmail(res.data.Emergency.email);
        setContact(res.data.Emergency.contact);
        setGender(res.data.Emergency.gender);
        setCurrently(res.data.Emergency.currently);
        setDoctor(res.data.Emergency.doctor);
        setReason(res.data.Emergency.reason);
        setCategory(res.data.Emergency.category);
    });
  }, []);



    //page refresh function

    function refreshPage() {
        window.location.reload(false);
    };



 
        const sendDataToAPI = () => {
        //Creating object
        const data = {
            age,
            gender,
            doctor,
            currently,
            category,
            reason

        }
        axios
        .put(`http://localhost:8070/Emergency/update/${id}`, data)
        .then(() => {
          alert("Update Successful");
          navigate(-1); 
        })
        .catch(() => {
          alert("Update Unsuccessful");
        });

    }

    return (
        <div className="main-container">



            {/* <NavBar /> */}
            <div className="body-container clearfix" style={{ width: '50%', margin: 'auto', backgroundColor: '#f0eaea' }}>
                <center>
                    <h1>Hospital Emergency Contact.</h1>
                    <p>Give us Your Emergency Contact Information.</p>
                </center>
             
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='name-container'>
                                <label id="eSavelabel" className="eme-full-name">Full Name:</label><br /> 
                                <input type="text" id="emesave" className="eme-name" name="name" readOnly value={name} onChange={(event) => {
                                    setFname(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                        <div className='category-container'>
                                <label id="eSavelabel" for="eme-category">Health Category</label><br />
                                <select id="emeScategory" className="eme-category" name="category" value={category} onChange={(event) => {
                                    setCategory(event.target.value);
                                }} required>
                                    <option value="">Select a category</option>
                                    <option value="Emotional Well-being">Emotional Well-being</option>
                                    <option value="ocial Connections">Social Connections</option>
                                    <option value="Cognitive Functioning">Cognitive Functioning</option>
                                    <option value="Behavioral health">Behavioral health</option>
                                    <option value="Stress Management">Stress Management</option>
                                    <option value="Other">Other</option>

                                </select>
                            </div><br />
                        </div>
                    </div>

                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='name-container'>
                                <label id="eSavelabel" className="eme-email">Email:</label><br /> 
                                <input type="text" id="emesave" className="eme-email" name="email" readOnly value={email} onChange={(event) => {
                                    setEmail(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                        <div className='discription-container'>
                                <label id="eSavelabel" for="eme-doctor">Show Available Doctors:</label><br />
                                <select  id="emesave" className="eme-doctor" name="doctor" value={doctor} onChange={(event) => {
                                    setDoctor(event.target.value);
                                }} required >
                                      <option value="">Select an Available Doctors</option>
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
                            <div className='time-container'>
                                <label id="eSavelabel" className="eme-age">Age:</label> <br/>
                                <input type="text" id="emesave" className="eme-age" name="age" value={age} onChange={(event) => {
                                    setAge(event.target.value);
                                }} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='reason-container'>
                                <label  id="eSavelabel" for="eme-reason">Emergency reason:</label><br />
                                <textarea id="emeStext" className="eme-reason" name="reason" value={reason} onChange={(event) => {
                                    setReason(event.target.value);
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
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">



                            <div className='gender-container'>
                                <label className="eme-gender" id="eSavelabel">Gender:</label> <br />
                              <input type="radio" id="emSradio" className="eme-gender" value="Male" name="gender" checked={gender === 'Male'} onChange={(event) => {
                                    setGender(event.target.value);
                                }} required />
                                <label id="eSavelabel" for="currently-yes">Male</label> 

                                <input type="radio" id="emSradio" className="eme-gender" value="Female" name="gender" checked={gender === 'Female'} onChange={(event) => {
                                    setGender(event.target.value);
                                }} required />
                                <label for="currently-yes" id="eSavelabel">Female</label>

                            </div><br />




                        </div>
                        <div className="form-col" id="fcoll">

                        </div>
                    </div>

                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">

                            <div className='currently-container'>
                                <label id="eSavelabel">Are you currently taking any medication?</label><br />
                               <input type="radio" id="emSradio" name="currently" value="yes" checked={currently === 'yes'} onChange={(event) => {
                                    setCurrently(event.target.value);
                                }} required />
                                <label for="currently-yes" id="eSavelabel">Yes</label>

                                <input type="radio" id="emSradio" name="currently" value="no" checked={currently === 'no'} onChange={(event) => {
                                    setCurrently(event.target.value);
                                }} required />
                                <label for="currently-no" id="eSavelabel">No</label>
                            </div><br />


                        </div>
                        <div className="form-col" id="fcoll">

                        </div>
                    </div>

                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">

                            


                        </div>
                        <div className="form-col" id="fcoll">

                        </div>
                    </div>





< center>
            <input type="submit" id="joinBtn"  onClick={sendDataToAPI} value="UPDATE"></input><br /><br />

            </center>


        </div >
            </div >



   


    );
}



