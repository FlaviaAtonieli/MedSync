const express = require('express');
const router = express.Router();
const diaController = require('../controllers/diaController');
const auth = require('../Middlewares/auth');

router.get('/:id_medico', auth, diaController.listarDiasPorMedico);
router.post('/', auth, diaController.criarDiaAtendimento);
router.delete('/:id_dia', auth, diaController.deletarDiaAtendimento);

module.exports = router;