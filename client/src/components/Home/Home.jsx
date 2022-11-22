import React, {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllPokemons, getAllTypes, filterByTypes, filterByOrigin, filterByOrder} from '../../redux/actions';
import {NavLink} from "react-router-dom";
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';
import Error from '../Error/Error';
import loading from '../../Img/Oscuro.gif';
import './Home.css';

function Home () {

const dispatch = useDispatch();
const pokemons = useSelector(state => state.pokemons);
const types = useSelector(state => state.types);
const error = useSelector(state => state.error);
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



  return(
    <div className='container-home'>
      <div className='NavBar'>

        <SearchBar/>        

      </div>

      <div className='container-filters'> 
        <select onChange={e => handleFilterByTypes(e)} className = "item-filter">
          <option value="All" key= "all" selected>Type</option>
          {types.map(t => <option value = {t.name} key={t.id} >{t.name[0].toUpperCase() +  t.name.slice(1)} </option>)}
        </select>

        <select onChange={e => handleFilterByOrder(e)} className = "item-filter">
          <option value="default" selected>Order</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="strong">Strong</option>
          <option value="weak">Weak</option>
        </select>

        <select onChange={ e => handleFilterByOrigin(e)} className = "item-filter">
          <option value="All" selected>All</option>
          <option value="exiting">Exiting</option>
          <option value="created">Created</option>
        </select>
      </div>
      
        {error? <Error/> :
          <>
            <div className= "container-cards">
            {currentPokemons.length? 
            (currentPokemons.map(p => 
            <NavLink to ={/pokemons/+ p.id} key= {p.id} className = "item-cards">
              <Card key = {p.id} name = {p.name} type = {p.types.map(t => t[0].toUpperCase() +  t.slice(1)).join(' - ')} img = {p.img} />
            </NavLink>)) :
            (<div>
              <img src={loading} alt="Ganger" />
            </div>)
            }
            </div>
            <Paginado pokemonPerPage={pokemonPerPage} pokemons = {pokemons.length} paginado = {paginado}/>
          </>
        }
    </div>
  )
}

export default Home;