import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { getAllTypes, putPokemon, getPokemonDetailState} from '../../redux/actions';
import './Edit.css'
import red from '../../Img/Red.png'


const validate = (input) => {
  const error = {};

  if(!input.name || input.name.length < 3) error.name = 'The name must have at least 3 letters';

  if(!input.hp || input.hp > 250 ) error.hp = 'Must have Hp between 1 and 250';

  if(!input.attack || input.attack > 250 ) error.attack = 'Must have Attack between 1 and 250';

  if(!input.defense || input.defense > 250 ) error.defense = 'Must have Defense between 1 and 250';

  if(!input.speed || input.speed > 250 ) error.speed = 'Must have Speed between 1 and 250';

  if(!input.types.length) error.types = 'Must be of at least 1 type';

  return error;
}

function Edit () {

const [form, setForm ] = useState ({
  name: "",
  hp: "",
  attack: "" ,
  defense: "",
  speed: "",
  height: "",
  weight: "",
  img: "",
  types: [],
})

const [error, setErrors] = useState({});


const {id} = useParams();
const dispatch = useDispatch();
const history = useHistory();
const types = useSelector(state => state.types)
const pokeDetail = useSelector(state => state.detail)


useEffect(() => {
  dispatch(getAllTypes())
  dispatch(getPokemonDetailState(id))
}, [dispatch, id])

useEffect(() => {
    setForm(...pokeDetail)
}, [ pokeDetail])

useEffect(() => {
  setErrors(validate({
    ...form
  }))
}, [form])


const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  })
  setErrors(validate({
    ...form,
    [e.target.name]: e.target.value
  }))
}

const handleSubmit = (e) => {
  e.preventDefault();
  alert("Pokemon successfully updated")
  dispatch(putPokemon(id, form));
    setForm({
    name: "",
    hp: "",
    attack: "" ,
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    types: [],
  })
  history.push(`/pokemons`);

}

const handleSelect = (e) => {
  if(form.types.length < 2) {
    setForm({
      ...form,
      types: [...form.types, e.target.value]
    })
  }
}

const handleDeleteType = (type) => {
  setForm({
    ...form,
    types: form.types.filter(t => t !== type)
  })
}

const validateButton = 
!(
  form.name.length &&
  form.hp &&
  form.attack&&
  form.defense &&
  form.speed&&
  form.types.length
) ||
form.hp > 250 ||
form.attack > 250 ||
form.defense > 250 ||
form.speed > 250;

return (
  <div className='form_container-edit'>
    <NavLink to = {`/pokemons/${id}`} className = 'link-back-form-edit'>
      Return to detail
    </NavLink>
    <h3 className='title-create'>Edit your Pokemon</h3>
    <form className='form-edit'  onSubmit={e => handleSubmit(e)}>

      <label htmlFor="name">
        Name <input type="text" name = "name" placeholder='Name' value = {form.name} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      {error.name && (<p className="danger">{error.name}</p>)} 
      </label>
      
      
      <label htmlFor="hp">
        Hp <input type="text" name = "hp" placeholder='1 - 250' value = {form.hp} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      {error.hp && (<p className="danger">{error.hp}</p>)} 
      </label>
      

      <label htmlFor="attack">
        Attack <input type="text" name = "attack" placeholder='1 - 250' value = {form.attack} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      {error.hp && (<p className="danger">{error.hp}</p>)} 
      </label>
      

      <label htmlFor="defense">
        Defense <input type="text" name = "defense" placeholder='1 - 250' value = {form.defense} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      {error.defense && (<p className="danger">{error.defense}</p>)} 
      </label>
      

      <label htmlFor="speed">
        Speed <input type="text" name = "speed" placeholder='10 - 250' value = {form.speed} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      {error.speed && (<p className="danger">{error.speed}</p>)} 
        </label>
      

      <label htmlFor="height">
        Height <small>(kg)</small> <input type="text" name = "height" value = {form.height} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      </label>
      

      <label htmlFor="weight">
        Weight <small>(cm)</small> <input type="text" name = "weight" value = {form.weight} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      </label>
      

      <label htmlFor="img">
        Image <input type="text" name = "img" placeholder='URL' value = {form.img} onChange = {e => handleChange(e)} className = 'input-form-edit'/>
      </label>

      <select  onChange={e => handleSelect(e)}>
        <option value="None">Type</option>
        {types.map(t => 
          <option value={t.name} key = {t.id}>{t.name[0].toUpperCase() +  t.name.slice(1)}</option>
          )}
      </select>

      {error.types && (<p className="danger">{error.types}</p>)} 

        <button type='submit'  disabled = {validateButton} className = 'button-edit'> Finish addition </button>
        
        <ul >
          {form.types.map(t =>            
            <li className='list-types'>
              {t[0].toUpperCase() +  t.slice(1)}
              <button onClick={() => handleDeleteType(t)} className ='bottom-delete'>x</button>
            </li>
          )}
        </ul>
        <img src={red} alt="Red" className='red-img'/>
    </form>
  </div>

)
}


export default Edit;