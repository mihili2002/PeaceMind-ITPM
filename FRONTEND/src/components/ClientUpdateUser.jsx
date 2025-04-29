import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8070/client/getUser/' + id)
      .then(res => {
        setName(res.data.name);
        setEmail(res.data.email);
        setAge(res.data.age);
        setAddress(res.data.address);
        setNic(res.data.nic);
        setGender(res.data.gender);
        setPassword(res.data.password);
      })
      .catch(err => console.error(err));
  }, []);

  const update = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8070/client/updateUser/' + id, {
      name: name,
      email: email,
      age: age,
      address: address,
      nic: nic,
      gender: gender,
      password: password
    })
      .then(res => {
        navigate('/ClientUser');
      })
      .catch(err => console.error(err));
  }

  return (                     
    <div className='flex items-center justify-center h-full mt-5'>
      <form onSubmit={update} className="bg-purple-700 p-6 rounded-lg shadow-md">
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="number" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="text" placeholder='Gender' value={gender} onChange={(e) => setGender(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 mb-4 rounded-md bg-purple-200 text-purple-700" />
        <button type="submit" className='bg-light-blue-500 text-white font-bold px-5 py-3 rounded-md hover:bg-light-blue-700'>Update Account</button>
      </form>
    </div>
  )
}

export default UpdateUser;
