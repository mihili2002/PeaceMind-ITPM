import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode instead of jwt_decode
import lapman from '../images/lapman.jpg';

const Userprofile = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token); // Decode the token to get user ID

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [nic, setNic] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8070/client/getUser/' + decodedToken.id)
            .then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
                setAge(res.data.age);
                setNic(res.data.nic);
                setAddress(res.data.address);
                setGender(res.data.gender);
                setPassword(res.data.password);
            })
            .catch(err => console.error(err));
    }, []);

    const update = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8070/client/updateUser/' + decodedToken.id, { name: name, email: email, age: age, address: address, nic: nic, gender: gender, password: password })
            .then(res => {
                alert("details updated");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{backgroundImage: `url(${lapman})`}}>
            <div className="p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <form onSubmit={update} className="space-y-4">
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                    <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                    <input type="text" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                    <input type="text" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                    <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                    <input type="text" placeholder='Gender' value={gender} onChange={(e) => setGender(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md">Update Account</button>
                </form>
            </div>
        </div>
    )
}

export default Userprofile;
