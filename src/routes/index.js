const {Router} = require('express');
const router = Router();
// Importar todos los routers;
const pokemons = require('./pokemons.js');
const types = require('./types.js');
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/',pokemons);
router.use('/',types);

module.exports = router;
