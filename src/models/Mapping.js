// Ficheiro: src/models/Mapping.js
// Descrição: Define a estrutura (schema) para os mapeamentos na base de dados.

const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
  // Ex: "192.168.1."
  ipPrefix: {
    type: String,
    required: [true, 'O prefixo de IP é obrigatório.'],
    unique: true,
    trim: true,
  },
  // Ex: "Unidade Salvador"
  location: {
    type: String,
    required: [true, 'A localização é obrigatória.'],
    trim: true,
  },
}, { 
  timestamps: true // Adiciona os campos createdAt e updatedAt automaticamente
});

const Mapping = mongoose.model('Mapping', mappingSchema);

module.exports = Mapping;
