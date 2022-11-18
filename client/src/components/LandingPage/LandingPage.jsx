import React from 'react';
import { NavLink } from 'react-router-dom';


function LandingPage () {
  return (
    <div>
      <img src="https://www.todofondos.net/wp-content/uploads/1680x1050-Pokemon-Pikachu-Clip-Art-Wallpaper-Minimalismo-Pixel-Art-%E2%80%A2-Fondo-de-pantalla-para-usted.jpg" alt="LAnding Page Pikachu" />
      <NavLink to = '/home'>Ingresar al Pokedex</NavLink>
    </div>
  )
};

export default LandingPage;