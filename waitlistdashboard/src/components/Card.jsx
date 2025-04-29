/*
import React from 'react'
import '../styles/content.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const offers = [
    {
        img:'/offers/weekend_off.jpg',
        name:'Weekend offer',
        details: 'You can get 10% discount on credit cards'
       
        
    },
    {
        img:'/offers/20_off.jpg',
        name: 'Friday peace',
        details: 'You can have 20% discount when booking two sessions '
    },     
    {
        img:'/offers/30_off.jpg',
        name: 'New member offer',
        details: 'First session booking is 30% off'
       
    },
    {
      img:'/offers/10_off.webp',
      name: 'Healthy offer',
      details: '10% off for payments above Rs.10000'
     
  },
  {
    img:'/offers/50_off.png',
    name: 'New year offer',
    details: '50% off for Old members from 1st jan - 31st jan'
   
},
]

function Card(){
  return(
   
      <div className = "card--container">
        {offers.map((item)=>(
          <div className = "card" >
            <div>
            <img src = {item.img} alt= "" className ="image"/> 
              <p className = "offer-name">{item.name}</p>
              <p className= "offer-detail">{item.details}</p>
              <button className= "card-button">Claim now </button>
            </div>  
          </div>
        ))}
      </div>
    
  )
}
export default Card

*/
import React from 'react';
import '../styles/content.css';

const offers = [
    {
        img:'/offers/weekend_off.jpg',
        name:'Weekend offer',
        details: 'You can get 10% discount on credit cards',
        couponCode: 'WEEKEND10' // Add coupon code
    },
    {
        img:'/offers/20_off.jpg',
        name: 'Friday peace',
        details: 'You can have 20% discount when booking two sessions ',
        couponCode: 'FRIDAY20' // Add coupon code
    },     
    {
        img:'/offers/30_off.jpg',
        name: 'New member offer',
        details: 'First session booking is 30% off',
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
    name: 'New year offer',
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
            <img src={item.img} alt="" className="image"/> 
            <p className="offer-name">{item.name}</p>
            <p className="offer-detail">{item.details}</p>
            <button className="card-button" onClick={() => handleClaimNow(item.couponCode)}>Claim now</button>
          </div>  
        </div>
      ))}
    </div>
  );
};

export default Card;


