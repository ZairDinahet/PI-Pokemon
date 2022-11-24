const { Router } = require('express');
const getAllPokemons = require('../controllers/getPokemons');
const postPokemon = require('../controllers/postPokemon');
const editPokemon = require('../controllers/editPokemon')
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
  const { name } = req.body;
  if(!name) return res.status(400).send('Mandatory data missing')
  
  try {
    const newPokemon = await postPokemon(req.body);
    newPokemon ? 
    res.status(200).send("Successfully created Pokemon") :
    res.status(404).send("The name you are trying to use is already taken");
  // const [newPokemon, created] = await Pokemon.findOrCreate({ 
  //   where: {name: name},
  //   defaults: {
  //     name,
  //     hp,
  //     attack,
  //     defense,
  //     speed,
  //     height,
  //     weight,
  //     img,
  //   }
  // })
  // if(created) {
  //   const relation = await Type.findAll({
  //     where: {name: type}
  //   })
  //   newPokemon.addTypes(relation)
  //   res.status(200).send("Successfully created Pokemon") 
  // } else {
  //   res.status(404).send("The name you are trying to use is already taken");
  // }
  } catch (error) {
    res.status(400).send(error);
  }
})

//elimino un pokemon de mi base datos
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pokeDelete = await Pokemon.findByPk(id)
    if(pokeDelete) {
      pokeDelete.destroy();
      return res.status(200).send('Pokemon removed successfully');
    } else {
      return res.status(404).send('The pokemon you want to eliminate does not exist')
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if(!name) return res.status(400).send('Mandatory data missing');

  try {

    await editPokemon(id, req.body);
    res.status(200).send("Pokemon successfully updated");

  } catch (error) {
    res.status(400).send(error)
  }
})


module.exports = router