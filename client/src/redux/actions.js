import axios from 'axios';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_NAME = "GET_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const POST_POKEMON = "POST_POKEMON";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const FILTER_ORDER = "FILTER_ORDER";
export const SET_ERROR = "SET_ERROR";

export const RESET = "RESET";



export const getAllPokemons = () => {
  return async function (dispatch){
    try {
      const allPokemons = await axios.get('http://localhost:3001/pokemons');
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: allPokemons.data
      })
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: true,
      })
    }
  }
}

export const getAllTypes = () => { 
  return async function (dispatch) {
    try {
      const allTypes = await axios.get('http://localhost:3001/types')
      return dispatch({
        type: GET_TYPES,
        payload: allTypes.data
      })
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: true,
      })
    }
  }
}

export const getPokemonByName = (name) => {
  return async function(dispatch){
    try {
      const pokemonByName = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch({
        type: GET_NAME,
        payload: pokemonByName.data
      })
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: true,
      })
    }
  }
}

export const getPokemonById = (id) => {
      return {
        type: GET_DETAILS,
        payload: id,
      }
}

export const postPokemon = (payload) => {
  return async function(dispatch) {
    try {
      const info = await axios.post('http://localhost:3001/pokemons', payload)
      return info;
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
      })
    }
  }
  
}
export const filterByTypes = (type) => {
  return {
    type: FILTER_TYPES,
    payload: type
  }
}

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_ORIGIN,
    payload: origin
  }
}

export const filterByOrder = (order) => {
  return {
    type: FILTER_ORDER,
    payload: order
  }
}

export const setError = (payload) => {
  return {
    type: SET_ERROR,
    payload: payload,
  }
}
export const resetPokemons = () => {
  return {
    type: RESET,
  }
}

