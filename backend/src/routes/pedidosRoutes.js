const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.post('/', pedidosController.crearPedido);
// La ruta en app.js será algo como app.use('/admin/pedidos', pedidosRoutes)
// O ajustamos la ruta original: app.get('/admin/pedidos', ...)
// Para mantener la lógica original, podemos poner the root '/' aquí
// Y montarla bajo '/admin/pedidos' o manejar dos archivos de rutas diferentes.
// Para no complicarlo ahora, lo dejaremos como:
router.get('/admin', pedidosController.listarPedidosAdmin);

module.exports = router;
