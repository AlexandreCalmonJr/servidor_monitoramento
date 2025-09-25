// Ficheiro: src/app.js
// Descrição: Atualizado para usar as novas rotas de mapeamento.

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // As rotas agora incluem /mappings

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite que o servidor entenda JSON

// Usar as rotas da API
// Todas as rotas (devices e mappings) são geridas pelo apiRoutes
app.use('/api', apiRoutes);

// Rota de saúde da aplicação
app.get('/', (req, res) => {
  res.send('Servidor de Monitoramento está no ar!');
});

module.exports = app;

