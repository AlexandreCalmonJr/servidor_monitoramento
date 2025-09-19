// Ficheiro: src/routes/api.js
// ---------------------------
// Este ficheiro define os endpoints da nossa API REST. Ele associa as rotas
// (ex: /monitor, /devices) aos métodos correspondentes no controlador de dispositivos.

const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// Rota para o agente enviar os dados de monitoramento.
// POST /api/monitor
router.post('/monitor', deviceController.handleMonitoringData);

// Rota para o painel de controlo obter a lista de todos os dispositivos.
// GET /api/devices
router.get('/devices', deviceController.getAllDevices);

// Rota para o painel de controlo obter os detalhes de um dispositivo específico.
// GET /api/devices/:id
router.get('/devices/:id', deviceController.getDeviceById);

module.exports = router;

