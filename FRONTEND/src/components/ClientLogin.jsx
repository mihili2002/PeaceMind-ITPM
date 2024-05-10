import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoginCover from "../images/LoginCover.jpg";
import peace from "../images/peace.png";
import { jwtDecode } from "jwt-decode"; // Import jwt_decode

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/client/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      const decodedToken = jwtDecode(response.data.token); // Decode the token
      navigate(`/ClientDashboard/${decodedToken.email}`);
      setAlertMessage("Login successful"); // Set success message
    } catch (error) {
      console.error(error);
      setAlertMessage("Login failed. Please try again."); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${LoginCover})` }}
      ></div>
      <div className="z-10 p-8 rounded shadow-md rounded-2xl">
        <img className="h-60 mx-auto" src={peace} alt="Peace" />
        {alertMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"  
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          <Link to="/TherapistAddTherapist">
            <p className="text-center font-body mt-2 text-gray-700 px-4 py-2 bg-blue-gray-300 rounded-lg">
              Are you a therapist?
            </p>
          </Link>
          <Link to="/ClientAdminlogin">
            <p className="text-center font-body mt-2  text-gray-700  bg-blue-gray-300 rounded-lg">
              Are you a System Admin?
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
