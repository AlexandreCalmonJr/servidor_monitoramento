// Ficheiro: src/models/Mapping.js
// DESCRIÇÃO: O modelo foi atualizado para usar uma faixa de IPs (ipStart, ipEnd) em vez de um prefixo.

const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  ipStart: {
    type: String,
    required: true,
    trim: true,
  },
  ipEnd: {
    type: String,
    required: true,
    trim: true,
  },
});

// Evita a criação de registos duplicados com a mesma localização
mappingSchema.index({ location: 1 }, { unique: true });

const Mapping = mongoose.model('Mapping', mappingSchema);

module.exports = Mapping;

