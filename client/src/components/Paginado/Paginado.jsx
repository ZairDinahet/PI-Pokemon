import React from 'react';
import './Paginado.css'

function Paginado ({pokemonPerPage, pokemons, paginado}){
  const pages = [];
  const numbers = Math.ceil(pokemons/pokemonPerPage)

  for (let i = 0; i < numbers; i++) {
    pages.push(i + 1);
  }

  return (
    <nav className='container-paginado'>
      <ul className='paginado'>
        {pages?.map( number => 
          <li className='page' key={number} onClick = {() => paginado(number)}> 
          {number} 
          </li>)}
      </ul>
    </nav>
  )

}

export default Paginado;