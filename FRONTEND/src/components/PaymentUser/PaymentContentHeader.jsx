import React, { useState } from 'react';
import { BiSearch, BiNotification } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../../styles/Paymentcontent.css';



const ContentHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Navigate to the invoice page with the searched invoice ID
      window.location.href = `/Paymentinvoice/${searchTerm}`;
    }
  };

 
  return (
    
    <div className='content--header'>
      <h1 className='header--title' style={{ fontSize: '1.8em', fontWeight: 'bold'  }}> Payment Portal</h1>
      <div className='header--activity'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search for invoice...'
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            id="searchbox"
          />
          <BiSearch className='icon' onClick={handleKeyPress} />
        </div>
        <div className='notify'>
          <BiNotification className='icon' />
        </div>
      </div>
    </div>
   
  );
};

export default ContentHeader;
