const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.loginUsuario);
router.post('/criar', authController.criarUsuario);

module.exports = router;