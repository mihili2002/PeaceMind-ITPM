import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const User = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const { id } = useParams();
  const [fullname, setfullname] = useState('');
  const [address, setaddress] = useState('');
  const [email, setemail] = useState('');
  const [nic, setNic] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setdob] = useState('');
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8070/therapist/gettherapist/' + decodedToken.id)
      .then(res => {
        setfullname(res.data.fullname);
        setaddress(res.data.address);
        setemail(res.data.email);
        setNic(res.data.nic);
        setGender(res.data.gender);
        setdob(res.data.dob);
        setphone(res.data.phone);
        setPassword(res.data.password);
      })
      .catch(err => console.error(err));
  }, []);

  const update = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8070/therapist/updateUser/' + decodedToken.id, {
      fullname: fullname,
      address: address,
      email: email,
      nic: nic,
      gender: gender,
      dob: dob,
      phone: phone,
      password: password,
    })
      .then(res => {
        alert("details updated")
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={update}
        className="bg-blue-100 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Update Profile</h2>
        <input type="text" placeholder='Name' value={fullname} onChange={(e) => setfullname(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder='Address' value={address} onChange={(e) => setaddress(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder='Gender' value={gender} onChange={(e) => setGender(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="date" placeholder='DOB' value={dob} onChange={(e) => setdob(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" placeholder='Phone' value={phone} onChange={(e) => setphone(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 mb-6 rounded-md bg-white text-blue-700 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button type="submit" className="w-full bg-blue-700 text-white font-bold px-5 py-3 rounded-md hover:bg-blue-800 transition">Update Account</button>
      </form>
    </div>
  );
};

export default User;
