import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function User(props) {
  const {_id, employeeId, name, password, email, gender, numberOfSessions, amountPerSession, salary} = props.user;

  const history = useNavigate();

  const deleteHandler = async()=>{

    await axios.delete(`http://localhost:8070/users/${_id}`)
    .then(res=>res.data)
    .then(()=>history("/"))
    .then(()=>history("/userdetails"));

  }
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Employee Salary Information</h2>
      <div style={styles.field}>
        <label style={styles.label}>Identification Number:</label>
        <span style={styles.value}>{_id}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>ID:</label>
        <span style={styles.value}>{employeeId}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Name:</label>
        <span style={styles.value}>{name}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Password:</label>
        <span style={styles.value}>{password}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Email:</label>
        <span style={styles.value}>{email}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Gender:</label>
        <span style={styles.value}>{gender}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Number Of Sessions:</label>
        <span style={styles.value}>{numberOfSessions}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Amount Per Session:</label>
        <span style={styles.value}>{amountPerSession}</span>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Salary:</label>
        <span style={styles.value}>{salary}</span>
      </div>
      <div style={styles.buttonContainer}>
        <Link to={`/userdetails/${_id}`}>
        <button style={styles.button}>Update</button></Link>
        
        <button style={styles.button} onClick={deleteHandler}>Delete</button>
        <br></br>
        <br></br>
      </div>
    </div>
   
  );
}

const styles = {
  container: {
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  field: {
    display: 'flex',
    marginBottom: '10px',
  },
  label: {
    flex: '1',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  value: {
    flex: '2',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
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
    margin: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
};

export default User;
