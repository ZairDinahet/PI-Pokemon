import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom';
import { postPokemon, getAllTypes} from '../../redux/actions';
import profesor from '../../Img/oak.png'
import './Form.css'


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

function CreatePokemon () {

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

  
  const dispatch = useDispatch();
  const history = useHistory()
  const types = useSelector(state => state.types)


  useEffect(() => {
    dispatch(getAllTypes())
  }, [dispatch])

  useEffect(() => {
    setErrors(validate({
      ...form
    }))
  }, [form])


  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postPokemon(form));
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
    history.push("/pokemons");
  }

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
  !(form.name.length &&
    form.hp.length &&
    form.attack.length &&
    form.defense.length &&
    form.speed.length &&
    form.types.length) 
  ||
  form.hp > 250 ||
  form.attack > 250 ||
  form.defense > 250 ||
  form.speed > 250;


  return (
    <div className='form_container'>
      <NavLink to = '/pokemons' className = 'link-back-form'>
        Return to Homepage 
      </NavLink>
      <h3 className='title-create'>Create your Pokemon</h3>
      <form className='form'  onSubmit={e => handleSubmit(e)}>

        <label htmlFor="name">
          Name <input type="text" name = "name" placeholder='Name' value = {form.name} onChange = {e => handleChange(e)} className = 'input-form'/>
        {error.name && (<p className="danger">{error.name}</p>)} 
        </label>
        
        
        <label htmlFor="hp">
          Hp <input type="text" name = "hp" placeholder='1 - 250' value = {form.hp} onChange = {e => handleChange(e)} className = 'input-form'/>
        {error.hp && (<p className="danger">{error.hp}</p>)} 
        </label>
        

        <label htmlFor="attack">
          Attack <input type="text" name = "attack" placeholder='1 - 250' value = {form.attack} onChange = {e => handleChange(e)} className = 'input-form'/>
        {error.hp && (<p className="danger">{error.hp}</p>)} 
        </label>
        

        <label htmlFor="defense">
          Defense <input type="text" name = "defense" placeholder='1 - 250' value = {form.defense} onChange = {e => handleChange(e)} className = 'input-form'/>
        {error.defense && (<p className="danger">{error.defense}</p>)} 
        </label>
        

        <label htmlFor="speed">
          Speed <input type="text" name = "speed" placeholder='10 - 250' value = {form.speed} onChange = {e => handleChange(e)} className = 'input-form'/>
        {error.speed && (<p className="danger">{error.speed}</p>)} 
          </label>
        

        <label htmlFor="height">
          Height <small>(kg)</small> <input type="text" name = "height" value = {form.height} onChange = {e => handleChange(e)} className = 'input-form'/>
        </label>
        

        <label htmlFor="weight">
          Weight <small>(cm)</small> <input type="text" name = "weight" value = {form.weight} onChange = {e => handleChange(e)} className = 'input-form'/>
        </label>
        

        <label htmlFor="img">
          Image <input type="text" name = "img" placeholder='URL' value = {form.img} onChange = {e => handleChange(e)} className = 'input-form'/>
        </label>

        <select  onChange={e => handleSelect(e)}>
          <option value="None">Type</option>
          {types.map(t => 
            <option value={t.name} key = {t.id}>{t.name[0].toUpperCase() +  t.name.slice(1)}</option>
            )}
        </select>

        {error.types && (<p className="danger">{error.types}</p>)} 

          <button type='submit' disabled = {validateButton} className = 'button-create'> Create </button>
          
          <ul >
            {form.types.map(t =>            
              <li className='list-types'>
                {t[0].toUpperCase() +  t.slice(1)}
                <button onClick={() => handleDeleteType(t)} className ='bottom-delete'>x</button>
              </li>
            )}
          </ul>
        
        <img src={profesor} alt="Profesor Oak" className='profesor'/>
      </form>
    </div>

  )
}
export default CreatePokemon;