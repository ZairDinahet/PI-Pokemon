import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { getPokemonById } from "../../redux/actions"
import "./Detail.css"

function Detail () {

  const {id} = useParams();
  const pokeDetail = useSelector(state => state.detail);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getPokemonById(id))
  }, [dispatch, id])
  
  return (
    <>
    {pokeDetail.map( p => 
    <div className="container1">
      <div className="card1">
      <img src={p.img} className ="img1" alt="" />
      <h1>{p.name}</h1>
      <h4>Type: {p.types.join(' - ')}</h4>
      <h4>ID Pokemon: {p.id}</h4>
      <h4>HP: {p.hp}</h4>
      <h4>Attack: {p.attack}</h4>
      <h4>Defense: {p.defense}</h4>
      <h4>Height: {p.height}</h4>
      <h4>Weight: {p.weight}</h4>
      <h4>Speed: {p.speed}</h4>
      </div>
    </div>
    )}
    </>
  )
}

export default Detail;