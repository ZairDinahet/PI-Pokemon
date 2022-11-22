import { 
  GET_ALL_POKEMONS,
  GET_TYPES,
  GET_NAME,
  GET_DETAILS,
  FILTER_TYPES,
  FILTER_ORIGIN,
  FILTER_ORDER,
  SET_ERROR
  
} from "./actions";

const initialState = {
  pokemons: [],
  pokemonsCopy: [],
  types: [],
  detail: [],
  error: false,
}


function rootReducer (state = initialState, action){
  switch(action.type){

    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload,
      }
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      }

    case GET_NAME:
      return{
        ...state,
        pokemons: action.payload,
      }
    
    case GET_DETAILS:
      const filterId = [...state.pokemonsCopy]
      const pokemon = filterId.filter( (p) => p.id.toString() === action.payload)
      return {
        ...state,
        detail: pokemon,
      }
    case FILTER_TYPES:
      let allPokemons = [...state.pokemonsCopy];
      const typeFiltered = action.payload === "All" ? allPokemons : allPokemons.filter(p => p.types.includes(action.payload))
      return {
        ...state,
        pokemons: typeFiltered,
      }

    case FILTER_ORIGIN:
      const pokemons  = [...state.pokemonsCopy];
      let filterOrigin = action.payload === "created" ? pokemons.filter(p => p.created) : pokemons.filter(p => !p.created);
      return {
        ...state,
        pokemons: action.payload === "All" ? pokemons : filterOrigin,
      }
    
    case FILTER_ORDER:
      let pokemones  = [...state.pokemons];

      if(action.payload === 'asc') pokemones.sort((a, b) => { 
          const aPokemon =  a.name.toLowerCase();
          const bPokemon =  b.name.toLowerCase()
          if(aPokemon > bPokemon) return 1;
          if(aPokemon < bPokemon) return -1;
          return 0;
        });
      if(action.payload === 'desc') pokemones.sort((a, b) => { 
        const aPokemon =  a.name.toLowerCase();
        const bPokemon =  b.name.toLowerCase()
        if(aPokemon > bPokemon) return -1;
        if(aPokemon < bPokemon) return 1;
        return 0;
        })
    //   if(action.payload === 'asc') pokemones.sort((a, b) => { 

    //     if(a.name > b.name) return 1;
    //     if(a.name < b.name) return -1;
    //     return 0;
    //   });
    // if(action.payload === 'desc') pokemones.sort((a, b) => { 

    //   if(a.name > b.name) return -1;
    //   if(a.name < b.name) return 1;
    //   return 0;
    //   })
      if(action.payload === 'strong') pokemones.sort((a, b) => b.attack - a.attack)
      if(action.payload === 'weak') pokemones.sort((a, b) => a.attack - b.attack)
      return{
        ...state,
        pokemons: pokemones
      }

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return {
        ...state
      }
  }
}


export default rootReducer;