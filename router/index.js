import express from 'express';
import { catchPokemon, getDetailPokemon, getMyPokemon, getPokemon, releaseMyPokemon, renamePokemon } from '../controllers/index.js';

const router = express.Router();

router.get('/pokemon', getPokemon);
router.get('/pokemon/detail/:name', getDetailPokemon)
router.post('/pokemon/catch-pokemon/:name', catchPokemon)
router.get('/my-pokemon', getMyPokemon)
router.delete('/release-my-pokemon/:id', releaseMyPokemon)
router.put('/rename/:id', renamePokemon)

export default router;
