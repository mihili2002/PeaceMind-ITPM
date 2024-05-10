
import React from 'react';
import '../../styles/Paymentcontent.css';

const offers = [
    {
        img:'/offers/weekend_off.jpg',
        name:'Weekend offer',
        details: 'get 10% discount on credit cards',
        couponCode: 'WEEKEND10' // Add coupon code
    },
    {
        img:'/offers/20_off.jpg',
        name: 'Friday peace',
        details: '20% discount when booking two sessions ',
        couponCode: 'FRIDAY20' // Add coupon code
    },     
    {
        img:'/offers/30_off.jpg',
        name: 'Member offer',
        details: 'New members can get First session booking is 30% off',
        couponCode: 'NEW30' // Add coupon code
    },
    {
      img:'/offers/10_off.webp',
      name: 'Healthy offer',
      details: '10% off for payments above Rs.10000',
      couponCode: 'HEALTHY10' // Add coupon code
  },
  {
    img:'/offers/50_off.png',
    name: 'NewYear offer',
    details: '50% off for Old members from 1st jan - 31st jan',
    couponCode: 'NEWYEAR50' // Add coupon code
},
]

const Card = () => {

  const handleClaimNow = (couponCode) => {
    alert(`Coupon code: ${couponCode}`); // Show coupon code in alert
  };

  return (
    <div className="card--container">
      {offers.map((item, index) => (
        <div className="card" key={index}>
          <div>
            <img src={item.img} alt="" className="image" onClick={() => handleClaimNow(item.couponCode)}/> 
            <p className="offer-name">{item.name}</p>
            <p className="offer-detail">{item.details}</p>
          </div>  
          <button className="card-button" >Claim now</button>
        </div>
      ))}
    </div>
  );
};

export default Card;


