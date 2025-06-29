// backend/routes/artigos.js
const express = require('express');
const router = express.Router();
const artigoController = require('../controllers/artigoController.js');
const auth = require('../Middlewares/auth'); 

router.get('/', artigoController.listarArtigos);

router.post('/', auth, artigoController.criarArtigo);
router.put('/:id', auth, artigoController.atualizarArtigo);
router.delete('/:id', auth, artigoController.deletarArtigo);

module.exports = router;