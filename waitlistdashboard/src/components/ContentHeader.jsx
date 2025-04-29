import React, { useState } from 'react';
import { BiSearch, BiNotification } from 'react-icons/bi';
import '../styles/content.css';

const ContentHeader = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='content--header'>
      <h1 className='header--title'> Payment Portal</h1>
      <div className='header--activity'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search for invoice...'
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <BiSearch className='icon' onClick={handleSearch} />
        </div>
        <div className='notify'>
          <BiNotification className='icon' />
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
