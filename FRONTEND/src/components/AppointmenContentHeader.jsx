import React, { useState } from 'react';
import { BiSearch, BiNotification } from 'react-icons/bi';
import '../styles/Appointmencontent.css';
import { Link } from 'react-router-dom';

const ContentHeader = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e); // Call the parent component's search function
  };

  return (
    <div className='content--header'>
      {/* <h1 className='header--title'style={{ fontSize: '1.8em', fontWeight: 'bold' }}>Appointment Portal</h1> */}
      <div className='header--activity'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleInputChange}
          />
          <BiSearch className='icon' />
        </div>
        <div className='notify'>
          <BiNotification className='icon' />
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
