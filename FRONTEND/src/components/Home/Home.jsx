import React from 'react';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
};

const sectionStyle = {
  marginBottom: '30px',
  width: '100%', // Increase the width of the sections
  margin: '0 auto', // Center the sections horizontally
};

const headingStyle = {
  fontSize: '24px',
  marginBottom: '10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
};

const textContainerStyle = {
  backgroundColor: '#f4f4f4', // Add background color to text part
  padding: '20px',
  borderRadius: '5px',
};

const imageContainerStyle = {
  position: 'relative',
  height: '400px',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

function Home() {
  return (
    <div>
      <Nav />
      <div style={imageContainerStyle}>
        <img
          src="/photo3.gif" // Replace with the path to your GIF file
          alt="Background"
          style={imageStyle}
        />
      </div>
      <div style={containerStyle}>
        <div style={textContainerStyle}> {/* Add background color to text part */}
          <section style={sectionStyle}>
            <h1><center>Welcome to Salary Management App</center></h1>
            
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}><center>Quick Links:</center></h2>
            <ul>
              <li>
                <Link to="/adduser" style={linkStyle}>
                  Add Employee
                </Link>
              </li>
              <li>
                <Link to="/userdetails" style={linkStyle}>
                  Employee Details
                </Link>
              </li>
              <li>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </section>

          
        </div>
      </div>
    </div>
  );
}

export default Home;
