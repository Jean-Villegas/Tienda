const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicacionesController');

router.post('/', publicacionesController.crearPublicacion);
router.get('/', publicacionesController.obtenerPublicaciones);

module.exports = router;
