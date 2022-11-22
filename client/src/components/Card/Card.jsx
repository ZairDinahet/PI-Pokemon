import React from "react";
import './Card.css'

function Card ({name, type, img, hp}) {
  return (
    <div className="sub-container-card">
      <div className="card">
      <img src={img} className ="img" alt="" />
      <div className="cards-text">
        <h2>{name}</h2>
        <h4>{type}</h4>
      </div>
      </div>
    </div>

  )
};

export default Card;