const { Router } = require('express');
const getAllPokemons = require('../controllers/getPokemons');
const {Pokemon, Type} = require('../db');
// traerme mis funciones controladoras get de la carpeta controllers
const router = Router();


//  /pokemons
// traerme todos los pokemons para ruta principal
router.get('/', async (req, res) => {
  const {name} = req.query;
  try {
    const allPokemons = await getAllPokemons();

    if(name){
      const filterPokemon = allPokemons.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
      filterPokemon.length ?
      res.status(200).send(filterPokemon) :
      res.status(404).send("Pokemon not found");
    } else {

      res.status(200).send(allPokemons);
    }
  } catch (error) {
    res.status(400).send(error);
  }

})

// /pokemons/id
//detalle de un pokemon, traermelos desde la url de detalles de pokemon
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const allPokemons = await getAllPokemons();
    const filterPokemons = allPokemons.filter(p => p.id == id);
    filterPokemons.length ?
    res.status(200).send(filterPokemons) :
    res.status(404).send('Pokemon not found')
  } catch (error) {
    res.status(400).send()
  }
})

// Creo mi pokemon y hago mi relacion con la tabla type 
router.post('/', async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, type, img } = req.body;
  if(!name) return res.status(400).send('Mandatory data missing')
  try {
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
        where: {name: type}
      })
      newPokemon.addTypes(relation)
      res.status(200).send("Successfully created Pokemon") 
    } else {
      res.status(404).send("The name you are trying to use is already taken");
    }

  } catch (error) {
    res.status(400).send(error);
  }
})

module.exports = router