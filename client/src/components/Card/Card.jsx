import React from "react";
import './Card.css'

function Card ({name, type, img, hp}) {
  return (
    <div className="container">
      <div className="card">
      <img src={img} className ="img" alt="" />
      <h1>{name}</h1>
      <h4>{type}</h4>
      </div>
    </div>

  )
};

export default Card;