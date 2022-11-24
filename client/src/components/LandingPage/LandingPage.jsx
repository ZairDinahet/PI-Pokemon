import React from 'react';
import { NavLink } from 'react-router-dom';
import landing from '../../Img/landing.jpg';
import './LandingPage.css';


function LandingPage () {
  return (
    <div className='container-landing'>
      <img src={landing} alt="" className='landing' />
      <NavLink to = '/pokemons' className="link-tohome">
        <button className='button-landing'>
          <h3>Start Pokedex</h3> 
        </button>
      </NavLink>
    </div>
  )
};

export default LandingPage;