import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Signupcover from '../images/signup cover.jpg';

function Createacc() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [age, setage] = useState('');
  const [address, setaddress] = useState('');
  const [nic, setnic] = useState('');
  const [gender, setgender] = useState('');
  const [password, setpassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateName = (value) => {
    return /^[a-zA-Z .]*$/.test(value);
  };

  const validateAge = (value) => {
    return /^\d{0,2}$/.test(value) && (value === '' || (parseInt(value) >= 20 && parseInt(value) <= 80));
  };

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const validateNIC = (value) => {
    return /^(\d{10}[vV]|\d{12})$/.test(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setname(value);
    setErrors((prevErrors) => ({ ...prevErrors, name: !validateName(value) ? 'Name should only contain alphabets, spaces.' : '' }));
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setage(value);
    setErrors((prevErrors) => ({ ...prevErrors, age: !validateAge(value) ? 'Age should be a number between 20 and 80.' : '' }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setemail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: !validateEmail(value) ? 'Invalid email format.' : '' }));
  };

  const handleNICChange = (e) => {
    const value = e.target.value;
    setnic(value);
    setErrors((prevErrors) => ({ ...prevErrors, nic: !validateNIC(value) ? 'NIC should be 12 numbers or 11 numbers with "V" or "v".' : '' }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (validateName(name) && validateAge(age) && validateEmail(email) && validateNIC(nic)) {
      axios.post('http://localhost:8070/client/Createacc', {
        name: name,
        email: email,
        age: age,
        address: address,
        nic: nic,
        gender: gender,
        password: password,
      })
        .then((res) => {
          console.log(res);
          navigate('/ClientLogin');
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className='flex bg-blue-100 min-h-screen'>
      <img className='h-screen w-3/5 object-cover rounded-2xl ' src={Signupcover} alt='Signup Cover' />
      <form onSubmit={submit} className='m-auto w-96 bg-white p-8 rounded-lg shadow-lg '>
        <h2 className='text-2xl font-bold mb-4'>Create an Account</h2>
        <label htmlFor='name' className='mb-2 block font-medium'>Name</label>
        <input
          id='name'
          type='text'
          placeholder='Name'
          value={name}
          onChange={handleNameChange}
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        {errors.name && <p className='text-red-500'>{errors.name}</p>}
        <label htmlFor='email' className='mb-2 block font-medium'>Email</label>
        <input
          id='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        {errors.email && <p className='text-red-500'>{errors.email}</p>}
        <label htmlFor='age' className='mb-2 block font-medium'>Age</label>
        <input
          id='age'
          type='text'
          placeholder='Age'
          value={age}
          onChange={handleAgeChange}
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        {errors.age && <p className='text-red-500'>{errors.age}</p>}
        <label htmlFor='nic' className='mb-2 block font-medium'>NIC</label>
        <input
          id='nic'
          type='text'
          placeholder='NIC'
          value={nic}
          onChange={handleNICChange}
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        {errors.nic && <p className='text-red-500'>{errors.nic}</p>}
        <label className='mb-2 block font-medium'>Gender</label>
        <div className='mb-4'>
          <label className='mr-2'>
            <input
              name='gender'
              type='radio'
              value='male'
              onChange={(e) => setgender(e.target.value)}
              className='mr-1'
            />
            Male
          </label>
          <label className='mr-2'>
            <input
              name='gender'
              type='radio'
              value='female'
              onChange={(e) => setgender(e.target.value)}
              className='mr-1'
            />
            Female
          </label>
          <label>
            <input
              name='gender'
              type='radio'
              value='other'
              onChange={(e) => setgender(e.target.value)}
              className='mr-1'
            />
            Other
          </label>
        </div>
        <label htmlFor='password' className='mb-2 block font-medium'>Password</label>
        <input
          id='password'
          type='password'
          placeholder='Password'
          onChange={(e) => setpassword(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md mb-4'
        />
        <button
          type='submit'
          className='w-full bg-green-700 text-white font-bold px-5 py-3 rounded-md hover:bg-green-600 transition-colors'
        >
          Create Account
        </button>
        <Link to='/Login' className='block text-center mt-4 text-blue-600 hover:underline'>
          Already have an account? Login here
        </Link>
      </form>
    </div>
  );
}

export default Createacc;
