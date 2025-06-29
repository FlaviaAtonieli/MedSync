const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require('../Middlewares/auth');

router.get('/medico/:id_medico/dia/:id_dia', auth, consultaController.listarConsultasPorMedicoDia);
router.post('/', auth, consultaController.criarConsulta);
router.delete('/:id_consulta', auth, consultaController.deletarConsulta);
router.put('/:id_consulta', auth, consultaController.atualizarConsulta);

module.exports = router;