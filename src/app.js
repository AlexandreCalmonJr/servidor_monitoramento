// Ficheiro: src/app.js
// --------------------
// Este ficheiro é responsável por configurar a instância da aplicação Express.
// Ele define os middlewares globais (CORS, JSON parser, logs) e associa as rotas da API.

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middlewares essenciais
// Habilita o CORS para permitir requisições do painel de controlo (frontend)
app.use(cors());

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json({ limit: '10mb' }));

// Middleware para logar cada requisição recebida
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Recebida requisição: ${req.method} ${req.path}`);
  next();
});

// Define a rota principal da API
app.use('/api', apiRoutes);

// Rota de "health check" para verificar se o servidor está online
app.get('/', (req, res) => {
  res.status(200).send('Servidor de Monitoramento está online e operacional!');
});

module.exports = app;

