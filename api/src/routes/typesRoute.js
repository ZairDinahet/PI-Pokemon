const { Router } = require('express');
const getAllTypes = require('../controllers/getTypes')

const router = Router();


// /types
// traerme todos los tipos de pokeomones
router.get('/', async (req, res) => {
  try {
    const allTypes = await getAllTypes();
    res.status(200).send(allTypes);

  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router;