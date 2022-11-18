import React, {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllPokemons, getAllTypes, filterByTypes, filterByOrigin, filterByOrder} from '../../redux/actions';
import {NavLink} from "react-router-dom"
import Card from '../Card/Card.jsx'
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado.jsx'
import './Home.css'

function Home () {

const dispatch = useDispatch();
const pokemons = useSelector(state => state.pokemons);
const types = useSelector(state => state.types);
const [currentPage, setCurrentPage] = useState(1);
const [pokemonPerPage] = useState(12);
const indexOfLastPokemon = currentPage * pokemonPerPage;
const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

useEffect(() => {
  dispatch(getAllPokemons())
  dispatch(getAllTypes())
}, [dispatch])


const paginado = (pageNumber) => setCurrentPage(pageNumber);

const handleFilterByTypes = (e) =>{
  e.preventDefault()
  dispatch(filterByTypes(e.target.value))
  setCurrentPage(1)
}

const handleFilterByOrigin = (e) => {
  e.preventDefault()
  dispatch(filterByOrigin(e.target.value))
  setCurrentPage(1)
}
const handleFilterByOrder = (e) => {
  e.preventDefault()
  dispatch(filterByOrder(e.target.value))
  setCurrentPage(1)
}

const handlePokemons = () => {
  dispatch(getAllPokemons())
}


  return(
    <>
          <SearchBar/>
      <Paginado pokemonPerPage={pokemonPerPage} pokemons = {pokemons.length} paginado = {paginado}/>

      <button onClick={() => handlePokemons()}>Reset</button>

      <div>
        <select onChange={e => handleFilterByTypes(e)}>
          <option value="All" key= "all" selected>Type</option>
          {types.map(t => <option value = {t.name} key={t.id} >{t.name} </option>)}
        </select>
      </div>

      <div>
        <select onChange={e => handleFilterByOrder(e)}>
          <option value="default" selected>All</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="strong">Strong</option>
          <option value="weak">Weak</option>
        </select>
      </div>

      <div>
        <select onChange={ e => handleFilterByOrigin(e)}>
          <option value="All" selected>All</option>
          <option value="exiting">Exiting</option>
          <option value="created">Created</option>
        </select>
      </div>

      <div className="container-pokemon">

        <div className= "container-home">
          {currentPokemons?.map(p => 
          <NavLink to ={/pokemons/+ p.id} key= {p.id}>
            <Card key = {p.id} name = {p.name} type = {p.types.join(' - ')} img = {p.img} />
          </NavLink>)}
          </div>
      </div>
    </>

  )
}

export default Home;