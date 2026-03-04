const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const municipiosRoutes = require('./routes/municipiosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Main health check routes
app.get('/', (req, res) => {
    res.send('NexStore backend está funcionando de manera modular. Usa /health para comprobar estado o las rutas de API.');
});

app.get('/health', (req, res) => {
    res.json({ ok: true, message: 'NexStore backend funcionando' });
});

// Enrutamiento principal
app.use('/auth', authRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/pedidos', pedidosRoutes);       // Para POST /pedidos y GET /pedidos/admin (listarPedidosAdmin)
app.use('/municipios', municipiosRoutes);

module.exports = app;
