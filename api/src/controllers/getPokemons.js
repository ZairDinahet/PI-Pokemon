const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getAllPokemons = async () => {
  // traigo los pokemones de la api y los filtro
  const numPokemons = 150;
  let apiPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${numPokemons}`)
  apiPokemons = apiPokemons.data.results.map(p => axios.get(p.url))
  apiPokemons = await axios.all(apiPokemons)
  apiPokemons = apiPokemons.map(p => {
    return {
      id: p.data.id,
      name: p.data.name,
      hp: p.data.stats[0].base_stat,
      attack: p.data.stats[1].base_stat,
      defense: p.data.stats[2].base_stat,
      speed: p.data.stats[5].base_stat,
      height: p.data.height,
      weight: p.data.weight,
      type: p.data.types.map(t => t.type.name),
      img: p.data.sprites.other.home.front_default,
      create: false,
    }
  })
  
  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  });
  
  const allPokemons = [...apiPokemons, ...dbPokemons]

  return allPokemons;
}

module.exports = getAllPokemons;


//Pedido hecho con promise.all
//   const getAllPokemons = async () => {
//   let poke = [];
//   let apiPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon')
//   apiPokemons = apiPokemons.data.results.map(p => axios.get(p.url))
//   await Promise.all(apiPokemons).then(pokemons => {
//   pokemons.map(p => {
//       poke.push({
//         id: p.data.id,
//         name: p.data.name,
//         hp: p.data.stats[0].base_stat,
//         attack: p.data.stats[1].base_stat,
//         defense: p.data.stats[2].base_stat,
//         speed: p.data.stats[5].base_stat,
//         height: p.data.height,
//         wight: p.data.wight,
//       }) 
//     })
//   })
//   return poke
// }