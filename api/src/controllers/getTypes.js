const axios = require('axios');
const { Type } = require('../db');


// me traigo los tipos de pokemons haciendo antes una validacion
const getAllTypes = async () => {
  const typeValidation = await Type.findAll()
  if(typeValidation.length) return typeValidation;

  const apiData = await axios.get('https://pokeapi.co/api/v2/type')
  const types = apiData.data.results.map(t =>{ return {name: t.name}});
  const create = await Type.bulkCreate(types);
  return create;
}

module.exports = getAllTypes;