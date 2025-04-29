import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/emeinsert.css";
import Navbar from "./navBar";

export default function EmergencyApp() {
    const currentDate = new Date();
    const [name, setFname] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("");
    const [currently, setCurrently] = useState("");
    const [doctor, setDoctor] = useState("");
    const [reason, setReason] = useState("");
    const [category, setCategory] = useState("");
    const [focused, setFocused] = useState(false);

    // List of hardcoded doctors
    const hardcodedDoctors = [
        "Dr.kalu",
        "Dr.hemantha",
        "Dr.denuwan",
        "Dr.hiran",
        "Dr.Perara",
        "Dr.mihili"
    ];

    useEffect(() => {
        function getEme() {
            axios.get(`http://localhost:8070/Avdoctor/`)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getEme();
    }, []);

    const handleFocus = (e) => {
        setFocused(true);
    };

    function sendData(s) {
        s.preventDefault();

        const neweme = {
            name,
            age,
            email,
            contact,
            gender,
            doctor,
            currently,
            category,
            reason,
            currentDate
        };

        axios.post("http://localhost:8070/Emergency/save/", neweme)
            .then(() => {
                alert("Emergency Appointment is successfully added");
                console.log(neweme);
                refreshPage();
            })
            .catch((err) => {
                alert("Error: Emergency Appointment was unsuccessful");
                console.log(err);
            });
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="main-container">
            <Navbar />
            <br />
            <div className="body-container clearfix" style={{ width: '55%', margin: 'auto', backgroundColor: '#f0eaea' }}>
                <center>
                    <h1>Hospital Emergency Contact.</h1>
                    <p>Give us Your Emergency Contact Information.</p>
                </center>
                <form className="reg-form" onSubmit={sendData}>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='name-container'>
                                <label className="eme-full-name">Full Name:</label><br />
                                <input type="text" className="eme-name" name="name" onChange={(event) => setFname(event.target.value)} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='category-container'>
                                <label htmlFor="eme-category">Health Category</label><br />
                                <select className="eme-category" name="category" onChange={(event) => setCategory(event.target.value)} required>
                                    <option value="">Select a category</option>
                                    <option value="Emotional Well-being">Emotional Well-being</option>
                                    <option value="Social Connections">Social Connections</option>
                                    <option value="Cognitive Functioning">Cognitive Functioning</option>
                                    <option value="Behavioral Health">Behavioral Health</option>
                                    <option value="Stress Management">Stress Management</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='e-container'>
                                <label className="eme-email">Email:</label><br />
                                <input type="email" className="eme-email" name="email" onChange={(event) => setEmail(event.target.value)} required onBlur={handleFocus} focused={focused.toString()} />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label htmlFor="eme-doctor">Show Available Doctors:</label><br />
                                <select className="eme-doctor" name="doctor" onChange={(event) => setDoctor(event.target.value)} required>
                                    <option value="">Select an Available Doctor</option>
                                    {hardcodedDoctors.map((doc, index) => (
                                        <option key={index} value={doc}>{doc}</option>
                                    ))}
                                </select>
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='time-container'>
                                <label className="eme-age">Age:</label> <br />
                                <input type="number" className="eme-age" name="age" onChange={(event) => setAge(event.target.value)} required />
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='discription-container'>
                                <label htmlFor="eme-contact">Contact No:</label><br />
                                <input type="text" className="eme-contact" name="contact" onChange={(event) => setContact(event.target.value)} required pattern="^[0-9]{10}$" onBlur={handleFocus} focused={focused.toString()} />
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='gender-container'>
                                <label className="eme-gender">Gender:</label> <br />
                                <input type="radio" className="eme-gender" value="Male" name="gender" onChange={(event) => setGender(event.target.value)} required />
                                <label htmlFor="currently-yes">Male</label>
                                <input type="radio" className="eme-gender" value="Female" name="gender" onChange={(event) => setGender(event.target.value)} required />
                                <label htmlFor="currently-yes">Female</label>
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll">
                            <div className='reason-container'>
                                <label htmlFor="eme-reason">Emergency reason:</label><br />
                                <textarea className="eme-reason" name="reason" onChange={(event) => setReason(event.target.value)} required />
                            </div><br />
                        </div>
                    </div>
                    <div className="form-row" id="frow">
                        <div className="form-col" id="fcoll">
                            <div className='currently-container'>
                                <label>Are you currently taking any medication?</label><br />
                                <input type="radio" name="currently" value="yes" onChange={(event) => setCurrently(event.target.value)} required />
                                <label htmlFor="currently-yes">Yes</label>
                                <input type="radio" name="currently" value="no" onChange={(event) => setCurrently(event.target.value)} required />
                                <label htmlFor="currently-no">No</label>
                            </div><br />
                        </div>
                        <div className="form-col" id="fcoll"></div>
                    </div>
                    <center>
                        <input type="submit" id="joinBtn" value="SUBMIT"></input><br /><br />
                    </center>
                </form>
            </div>
        </div>
    );
}
