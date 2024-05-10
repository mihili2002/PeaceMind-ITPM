
import React from 'react';
import PaymentContentHeader from './PaymentContentHeader';
import PaymentCard from './PaymentCard';
import '../../styles/Paymentcontent.css';



const Content = () => {

  

  return (
    <div className="content">
      <PaymentContentHeader />
     
      <PaymentCard />
    </div>
    
  );
};

export default Content;
