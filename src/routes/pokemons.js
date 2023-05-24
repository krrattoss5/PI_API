const {Router} = require('express');
const router = Router();
const { getPokemons,getPokemonById,createPokemon, getPokemonByName,deletePokemon } = require('../controllers/pokemons.js')

router.get('/pokemons',getPokemons);//getalls
router.get('/pokemon/:idPokemon',getPokemonById);//params
router.delete('/pokemon/:idPokemon',deletePokemon);//params
router.get('/pokemon',getPokemonByName);//queries
router.post('/pokemon/create',createPokemon);//createPokemon

module.exports = router;