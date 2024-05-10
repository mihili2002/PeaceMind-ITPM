
import React from 'react';
import '../styles/Appointmencontent.css';

import { Link } from 'react-router-dom';
const offers = [
    {
        img:'doc1.jpeg',
        name:'Dr.Fernando',
        details: '(Ph.D.)  Focuses on couples therapy. ',
    },
    {
        img:'doc2.jpeg',
        name: 'Dr.Perera',
        details: '(Ph.D.)  Focuses on  family counseling. ',
        
    },     
    {
        img:'doc3.jpeg',
        name: 'Dr.Stephani',
        details: '(Ph.D.)  Focuses on couples therapy.',
       
    },
    {
      img:'doc4.jpeg',
      name: 'Dr.Amanda',
      details: '(Ph.D.)  Focuses on family counseling. ',
     
  },
  {
    img:'doc5.jpeg',
    name: 'Dr.Collin',
    details: '(Ph.D.)  Focuses on couples therapy.',
    
},
]

const Card = () => {

  
  return (
    <div className="card--container">
      {offers.map((item, index) => (
        <div className="card" key={index}>
          <div>
            <img src={item.img} alt="" className="image"/> 
            <p className="offer-name">{item.name}</p>
            <p className="offer-detail">{item.details}</p>
            
            {/* <Link className="card-button"> Therapist</Link> */}
          </div>  
        </div>
      ))}
    </div>
  );
};

export default Card;


