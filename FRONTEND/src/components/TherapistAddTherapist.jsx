import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTherapist() {
  const [fullname, setfullname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const navigator = useNavigate();
  const [therapists, setTherapists] = useState([]);   
  const [selectedTherapist, setSelectedTherapist] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('nic', nic);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('file', file);
    formData.append('doctorName', selectedTherapist);

    axios
      .post('http://localhost:8070/therapist/createprofile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        navigator('/TherapistTherapistLogin');
      })
      .catch((err) => console.error(err));
  };
  // axios.get('http://localhost:8070/therapist/getTherapistsFullname')
  //     .then(response => {
  //       // Handle successful response
  //       // Set therapists' names to the component's state
  //       setTherapists(response.data);
  //     })
  //     .catch(error => {
  //       // Handle errors occurred during the request
  //       console.error('There was a problem with the request:', error);
  //     });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={submit} style={{ backgroundColor: '#8ab8da', padding: '20px', borderRadius: '5px', maxWidth: '500px' }}>
      <lable html for="Firstname">Firstname</lable>
        <input
          type="text"
          placeholder="Firstname"
          value={fullname}
          onChange={(e) => setfullname(e.target.value.replace(/[^a-zA-Z.]/g, ''))}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        <lable html for="Address">Address</lable>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        <lable html for="email">Email</lable>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        <lable html for="NIC">NIC</lable>
        <input
          type="text"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value.replace(/[^0-9Vv]/g, '').slice(0, 12))}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
              style={{ marginRight: '5px' }}
            />
            Male
          </label>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
              style={{ marginRight: '5px' }}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="other"
              checked={gender === 'other'}
              onChange={(e) => setGender(e.target.value)}
              style={{ marginRight: '5px' }}
            />
            Other
          </label>
        </div>
        <lable html for="Date of Birth">Date of Birth</lable>
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 20)).toISOString().split("T")[0]}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        <lable html for="contact">Contact</lable>
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        
        <lable html for="Resume">Resume</lable>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '5px 0' }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', margin: '10px 0', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default AddTherapist;
