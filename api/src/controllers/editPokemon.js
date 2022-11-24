const { Pokemon, Type } = require('../db');

const editPokemon  = async (id, { name, hp, attack, defense, speed, height, weight, img, types}) => {
  if(!img || !img.length) img = "https://freepngimg.com/thumb/pokemon/37603-9-pokeball.png";
  const pokeEdit = await Pokemon.findByPk(id)
    await pokeEdit.update(
      {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
      },
      {where: {id: id}}
    )
  const relation = await Type.findAll({
      where: {name: types}
    })
  await pokeEdit.setTypes(relation);
  return pokeEdit;
}

module.exports = editPokemon;