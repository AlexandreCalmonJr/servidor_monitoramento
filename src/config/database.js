// Ficheiro: src/config/database.js
// --------------------------------
// Responsável por criar e configurar a conexão com o banco de dados MongoDB
// usando o Mongoose, com base na variável de ambiente MONGODB_URI.

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI não foi definida no ficheiro .env");
    }
    
    await mongoose.connect(MONGODB_URI);
    
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;

