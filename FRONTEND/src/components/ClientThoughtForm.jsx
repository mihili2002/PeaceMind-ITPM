import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ThoughtForm = () => {
  const [date, setdate] = useState("");
  const [thought, setthought] = useState("");
  const [reason, setreason] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8070/client/addthought", {
        email: decodedToken.email,
        date: date,
        thought: thought,
        reason: reason,
         // Include the email from the decoded token
      })
      .then((res) => {
        console.log(res);
        navigate(`/ClientDashboard/${decodedToken.email}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex bg-blue-100 min-h-screen">
      <form
        onSubmit={submit}
        className="m-auto w-96 bg-white p-8 rounded-lg shadow-lg "
      >
        <h2 className="text-2xl font-bold mb-4">Add a thought</h2>
        <input
          type="date"
          placeholder="date"
          onChange={(e) => setdate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="thought"
          onChange={(e) => setthought(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <input
          type="text"
          placeholder="reason"
          onChange={(e) => setreason(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white font-bold px-5 py-3 rounded-md hover:bg-green-600 transition-colors"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
