// Ficheiro: src/server.js
// -----------------------
// Ponto de entrada principal da aplicação. Inicializa a conexão
// com o MongoDB e inicia o servidor Express.

require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Conecta-se ao MongoDB
    await connectDB();
    
    // 2. Inicia o servidor Express
    app.listen(PORT, () => {
      console.log(`\nServidor a correr na porta ${PORT}`);
      console.log('Backend pronto para receber dados dos agentes.');
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
    process.exit(1);
  }
};

startServer();
