
import React from 'react';
import ContentHeader from './ContentHeader';
import Card from './Card';
import '../styles/content.css';

const Content = () => {
  return (
    <div className="content">
      <ContentHeader />
      <Card />
    </div>
  );
};

export default Content;
