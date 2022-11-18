import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getPokemonByName } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
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
  return (
      <header className='navbar'>
        <NavLink to = "/pokemons/create">Create</NavLink>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label className="label" htmlFor="title"/> 
            <input
              type="text"
              placeholder='Search...'
              value={name}
              onChange={(e) => handleChange(e)}
            />
          <button type="submit">BUSCAR</button>
        </form>
      </header>
  )
}

export default SearchBar