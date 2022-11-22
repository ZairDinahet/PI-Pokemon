import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getPokemonByName, getAllPokemons, getAllTypes } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import search from '../../Img/search.png'
import refresh from '../../Img/refresh.png'
import create from '../../Img/+.png'
import pokeball from '../../Img/pokeballwhite.png'
import './SearchBar.css'


function SearchBar () {

  const[name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getPokemonByName(name))
    setName("")
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handlePokemons = () => {
    dispatch(getAllPokemons())
    dispatch(getAllTypes())
  }
  
  return (
      <header className='navbar'>
          <h1 className='title-pokedex' onClick={() => handlePokemons()}>P<img src={pokeball} alt ="pkeball" className='pokeball-img'/>kédex</h1>

        <button className='button-refresh' onClick={() => handlePokemons()}> 
        <img src={refresh} alt="refresh" className='refresh' />
        </button>
        
        <NavLink to = "/pokemons/create" className='button-create-link'>
          <img src={create} alt="create" className='crate-link'  />
        </NavLink>

        <form onSubmit={(e) => handleSubmit(e)} >
            <button type="submit" className='button-search'>
              <img src={search} alt="search" className='search' />
            </button>
            <input
              type="text"
              placeholder='Search...'
              className='input'
              value={name}
              onChange={(e) => handleChange(e)}
            />
        </form>
      </header>
  )
}

export default SearchBar