const { Router } = require('express');
const pokemonsRoute = require('./pokemonsRoute');
const typesRoute = require('./typesRoute');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', typesRoute)
router.use('/pokemons', pokemonsRoute);



module.exports = router;
