const { Pokemon, Type } = require('../db');

const postPokemon = async ({name, hp, attack, defense, speed, height, weight, types, img}) => {
  if(!img || !img.length) img = "https://freepngimg.com/thumb/pokemon/37603-9-pokeball.png"
  const [newPokemon, created] = await Pokemon.findOrCreate({ 
    where: {name: name},
    defaults: {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
    }
  })
  if(created) {
    const relation = await Type.findAll({
      where: {name: types}
    })
    newPokemon.addTypes(relation);
    return created;
  } else {
    return created;
  }
}

module.exports = postPokemon;