import React, { useState } from 'react';
import Nav from "../Nav/Nav";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        employeeId: "",
        name: "",
        password: "",
        email: "",
        nic: "",
        gender: "",
        numberOfSessions: "",
        amountPerSession: "",
    });
    const [errors, setErrors] = useState({
        passwordError: "",
        emailError: "",
        employeeIdError: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value
        }));

        // Validate password
        if (name === 'password') {
            const isValidPassword = validatePassword(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: isValidPassword ? "" : "Password must be at least 6 characters long"
            }));
        }

        // Validate email
        if (name === 'email') {
            const isValidEmail = validateEmail(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                emailError: isValidEmail ? "" : "Invalid email address"
            }));
        }

        // Validate employee ID
        if (name === 'employeeId') {
            const isValidEmployeeId = validateEmployeeId(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                employeeIdError: isValidEmployeeId ? "" : "Employee ID must be at least 6 characters long"
            }));
        }
    };

    const validatePassword = (password) => {
        return password.length >= 6; // changed to at least 6 characters
    };

    const validateEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateEmployeeId = (employeeId) => {
        return employeeId.length >= 4; // changed to at least 6 characters
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (validateForm()) {
            sendRequest().then(() => history('/userdetails'));
        }
    };

    const validateForm = () => {
        return (
            validatePassword(inputs.password) &&
            validateEmail(inputs.email) &&
            validateEmployeeId(inputs.employeeId)
        );
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:8070/users", {
            employeeId: String(inputs.employeeId),
            name: String(inputs.name),
            password: String(inputs.password),
            email: String(inputs.email),
            gender: String(inputs.gender),
            numberOfSessions: Number(inputs.numberOfSessions),
            amountPerSession: Number(inputs.amountPerSession),
        }).then(res => res.data);
    };

    const styles = {
        container: {
            textAlign: 'center',
        },
        heading: {
            color: '#333',
            marginBottom: '20px',
        },
        formContainer: {
            maxWidth: '400px',
            margin: '0 auto',
        },
        form: {
            backgroundColor: '#D0D3D4  ', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
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

    return (
        <div style={styles.container}>
            <Nav />
            <h1 style={styles.heading}>Add Employee Salary Details</h1>
            <div style={styles.formContainer}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Employee Id:</label>
                    <br />
                    <input type="text" name="employeeId" onChange={handleChange} value={inputs.employeeId} required style={styles.input} />
                    <br />
                    {errors.employeeIdError && <span style={{ color: 'red' }}>{errors.employeeIdError}</span>}
                    <br /><br />
                    <label style={styles.label}>Name:</label>
                    <br />
                    <input type="text" name="name" onChange={handleChange} value={inputs.name} required style={styles.input} />
                    <br /><br />
                    <label style={styles.label}>Password:</label>
                    <br />
                    <input type="password" name="password" onChange={handleChange} value={inputs.password} required style={styles.input} />
                    <br />
                    {errors.passwordError && <span style={{ color: 'red' }}>{errors.passwordError}</span>}
                    <br /><br />
                    <label style={styles.label}>Email:</label>
                    <br />
                    <input type="email" name="email" onChange={handleChange} value={inputs.email} required style={styles.input} />
                    <br />
                    {errors.emailError && <span style={{ color: 'red' }}>{errors.emailError}</span>}
                    <br /><br />
                    <label style={styles.label}>Gender:</label>
                    <br />
                    <input type="text" name="gender" onChange={handleChange} value={inputs.gender} required style={styles.input} />
                    <br /><br />
                    <label style={styles.label}>Number Of Sessions:</label>
                    <br />
                    <input type="number" name="numberOfSessions" onChange={handleChange} value={inputs.numberOfSessions} required style={styles.input} />
                    <br /><br />
                    <label style={styles.label}>Amount Per Session:</label>
                    <br />
                    <input type="number" name="amountPerSession" onChange={handleChange} value={inputs.amountPerSession} required style={styles.input} />
                    <br /><br />
                    <button style={styles.button}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;

