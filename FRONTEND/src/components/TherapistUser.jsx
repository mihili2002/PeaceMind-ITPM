import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const User = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Decode the token to get user ID

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
    <div className='flex items-center justify-center h-full mt-5'>
      
      <form onSubmit={update} className="bg-purple-700 p-6 rounded-lg shadow-md">
        <input type="text" placeholder='Name' value={fullname} onChange={(e) => setfullname(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='address' value={address} onChange={(e) => setaddress(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='Gender' value={gender} onChange={(e) => setGender(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="date" placeholder='dob' value={dob} onChange={(e) => setdob(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='phone' value={phone} onChange={(e) => setphone(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <button type="submit" className='bg-light-blue-500 text-white font-bold px-5 py-3 rounded-md hover:bg-light-blue-700'>Update Account</button>
      </form>
    </div>
  );
};

export default User;