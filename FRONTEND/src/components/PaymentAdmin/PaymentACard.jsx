
import React from 'react';
import '../../styles/PaymentAContent.css';

const ACard = ({ title, description }) => {
  return (
    <div className="Acard">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ACard;
