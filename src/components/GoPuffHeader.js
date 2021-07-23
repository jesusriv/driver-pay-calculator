import React from 'react'
import cardImg from '../assets/card.png';

const GoPuffHeader = () => {
  return (
    <div className="card mb-4">
      <div className="img-container">
        <img src={cardImg} className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
        <h3 className="card-title">Driver Pay Calculator</h3>
        <p className="card-text">This calculator serves as a method to generate an <em>estimate</em> of a driver partner's pay.</p>
        <p className="card-text"><small className="text-muted">Not to be used in conjunction with driver's, but as a tool for management, to better understand driver pay.</small></p>
      </div>
    </div>
  );
};

export default GoPuffHeader;
