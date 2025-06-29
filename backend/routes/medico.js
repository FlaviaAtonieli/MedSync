const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
const auth = require('../Middlewares/auth');

router.get('/', auth, medicoController.listarMedicoAPI);
router.post('/', auth, medicoController.criarMedico);
router.put('/:id', auth, medicoController.atualizarMedico);
router.delete('/:id', auth, medicoController.deletarMedico);

module.exports = router;