// Ficheiro: src/routes/api.js
// DESCRIÇÃO: Corrigido para garantir que todos os controladores são importados e usados corretamente.

const express = require('express');
const router = express.Router();

// Importar os controladores
const deviceController = require('../controllers/deviceController');
const mappingController = require('../controllers/mappingController');

// --- Rotas para Dispositivos ---
// Esta rota recebe os dados dos agentes Flutter
router.post('/monitor', deviceController.handleDeviceData);

// Esta rota fornece a lista de dispositivos para o painel de controlo
router.get('/devices', deviceController.getDevices);


// --- Rotas para Mapeamentos de IP ---
// Fornece a lista de mapeamentos
router.get('/mappings', mappingController.getAllMappings);

// Cria um novo mapeamento
router.post('/mappings', mappingController.createMapping);

// Elimina um mapeamento existente
router.delete('/mappings/:id', mappingController.deleteMapping);


module.exports = router;

