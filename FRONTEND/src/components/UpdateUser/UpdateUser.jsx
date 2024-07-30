import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {useParams} from 'react-router'
import { useNavigate } from 'react-router-dom'




function UpdateUser() {

    const[inputs,setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() =>{

        const fetchHandler  = async()=>{

            await axios
            .get(`http://localhost:8070/users/${id}`)
            .then((res) => res.data)
            .then((data)=> setInputs(data.user));

        };

        fetchHandler();
    },[id]);

    const sendRequest = async ()=>{

        await axios
        .put(`http://localhost:8070/users/${id}`,{

            employeeId: String(inputs.employeeId),
            name: String(inputs.name),
            password: String(inputs.password),
            email: String(inputs.email),
            gender: String(inputs.gender),
            numberOfSessions: Number(inputs.numberOfSessions),
            amountPerSession: Number(inputs.amountPerSession),

        })
             .then((res) => res.data);
    };
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() =>
         history('/userdetails'));
    };
  return (
    <div> 
        <h3 style={styles.heading}><center>Update Employee Salary Details</center></h3>

        <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Employee Id:</label>
                <br/>
                <input type="text" name="employeeId" onChange={handleChange} value={inputs.employeeId} required style={styles.input}/>
                <br/><br/>
                <label style={styles.label}>Name:</label>
                <br/>
                <input type="text" name="name" onChange={handleChange} value={inputs.name} required style={styles.input}/>
                <br/><br/>
                <label style={styles.label}>Password:</label>
                <br/>
                <input type="password" name="password" onChange={handleChange} value={inputs.password} required style={styles.input}/>
                <br/><br/>
                <label style={styles.label}>Email:</label>
                <br/>
                <input type="email" name="email" onChange={handleChange} value={inputs.email} required style={styles.input}/>
                <br/><br/>
                <label style={styles.label}>Gender:</label>
                <br/>
                <input type="text" name="gender" onChange={handleChange} value={inputs.gender} required style={styles.input}/>
                <br/><br/>
                <label style={styles.label}>Number Of Sessions:</label>
                <br/>
                <input type="number" name="numberOfSessions" onChange={handleChange} value={inputs.numberOfSessions} required style={styles.input}/>
                <br/><br/>
                <label style={styles.label}>Amount Per Session:</label>
                <br/>
                <input type="number" name="amountPerSession" onChange={handleChange} value={inputs.amountPerSession} required style={styles.input}/>
                <br/><br/>
                

                <button style={styles.button}>Submit</button>
            </form>
      
    </div>
  )
}

const styles = {
    container: {
        textAlign: 'center',
    },
    heading: {
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        maxWidth: '400px',
        margin: '0 auto',
    },
    label: {
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '10px',
    },
    button: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};


export default UpdateUser
