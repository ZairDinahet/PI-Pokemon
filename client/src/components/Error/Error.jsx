import React from 'react';
import { useDispatch} from 'react-redux';
import { getAllPokemons, getAllTypes, setError } from '../../redux/actions';
import './Error.css'
import wobbuffet from '../../Img/miu.png'


function Error ( ) {
  const dispatch = useDispatch();


  const handleHome = (e) => {
    e.preventDefault()
    dispatch(setError(false))
    dispatch(getAllPokemons())
    dispatch(getAllTypes())
  }
  return ( 
    <div>
      <img src={wobbuffet} alt="wobbuffet" className='wobbuffet' />  
      <div className='text-error'>
        <h1>NOOOO!</h1>
        <h1>What you were looking for was not found!</h1>
        <button onClick ={(e) => handleHome(e)} className = 'button-back-home'>Return to Homepage</button>
      </div>
    </div>
  )
}



export default Error;

