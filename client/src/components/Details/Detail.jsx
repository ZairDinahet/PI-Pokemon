import React, { useEffect }from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams, NavLink, useHistory} from "react-router-dom"
import { getPokemonDetailState, deletePokemon} from "../../redux/actions"
import "./Detail.css"

function Detail () {

  const {id} = useParams();
  const pokeDetail = useSelector(state => state.detail);
  const dispatch = useDispatch();
  const history = useHistory()



  useEffect(() => {
    dispatch(getPokemonDetailState(id))
  }, [dispatch, id])
  
  const handleDelete = () => {
    alert("Pokemon removed successfully")
    dispatch(deletePokemon(id));
    history.push("/pokemons")
  }

  return (
    <div>
      {pokeDetail.map( p => 
        <>
        <NavLink to = '/pokemons'className = 'link-back-detail'>
          Return to Homepage
        </NavLink>

        <div className="container1">
          <div className="card1">
          <img src={p.img} className ="img1" alt="" />
          <h1 className='name-detail'>{p.name[0].toUpperCase() + p.name.slice(1)}</h1>
          <div className='container-date'>
            <h4>ID <strong>({p.id}) </strong></h4>
            <h4>Type: <strong>{p.types.map(t => t[0].toUpperCase() +  t.slice(1)).join(' - ')}</strong></h4>
            <h4>HP: <strong>{p.hp}</strong> </h4>
            <h4>Attack: {p.attack}</h4>
            <h4>Defense: {p.defense}</h4>
            <h4>Height: {p.height}</h4>
            <h4>Weight: {p.weight}</h4>
            <h4>Speed: {p.speed}</h4>
          </div>
          </div>
        </div>
        {p.created && (
          <div className='container-ext'>
          <NavLink to ={`/pokemons/edit/${id}`} className = "link-edit">Edit Pokemon</NavLink>
          <button onClick={() => handleDelete()} className = "button-delete">Delete Pokemon</button>
          </div>
        )}
        </>
      )}
    </div>
  )
}

export default Detail;