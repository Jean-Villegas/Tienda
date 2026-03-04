const express = require('express');
const router = express.Router();
const municipiosController = require('../controllers/municipiosController');

router.get('/', municipiosController.obtenerMunicipios);

module.exports = router;
