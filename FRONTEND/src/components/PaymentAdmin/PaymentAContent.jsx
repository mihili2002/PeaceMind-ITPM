
import React from 'react';
import PaymentAContentHeader from './PaymentAContentHeader';
import PaymentACard from './PaymentACard';
import '../../styles/Paymentcontent.css';



const Content = () => {

  

  return (
    <div className="content">
      <PaymentAContentHeader />
     
      <PaymentACard />
    </div>
    
  );
};

export default Content;
