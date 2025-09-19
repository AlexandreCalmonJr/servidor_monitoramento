// Ficheiro: src/models/Device.js
// ------------------------------
// Define o 'Schema' e o 'Modelo' (Model) do Mongoose para um Dispositivo.
// Descreve a estrutura dos documentos que serão armazenados na coleção 'devices'.

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  hostname: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true, // Garante que o número de série seja único
    index: true,  // Cria um índice para buscas rápidas
  },
  serviceTag: String,
  model: String,
  ipAddress: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: 'Desconhecida',
  },
  installedPrograms: {
    type: [String], // Armazena uma lista de strings
    default: [],
  },
  printerStatus: {
    type: String,
    default: 'N/A',
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
}, {
  // Opções do Schema
  timestamps: true, // Cria os campos 'createdAt' e 'updatedAt' automaticamente
});

// Cria o modelo 'Device' que irá interagir com a coleção 'devices' no MongoDB
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;

