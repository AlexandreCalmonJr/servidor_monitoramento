// Ficheiro: src/models/Device.js
// DESCRIÇÃO: Adicionados os novos campos zebraStatus, bematechStatus e totemType ao schema.

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  hostname: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  model: { type: String, default: 'N/A' },
  serviceTag: { type: String, default: 'N/A' },
  ip: { type: String, default: 'N/A' },
  location: { type: String, default: 'Desconhecida' },
  installedPrograms: { type: [String], default: [] },
  printerStatus: { type: String, default: 'N/A' },
  lastSeen: { type: Date, default: Date.now },
  biometricReaderStatus: { type: String, default: 'N/A' },
  // NOVOS CAMPOS ADICIONADOS PARA SUPORTAR OS DADOS DO CLIENTE
  zebraStatus: { type: String, default: 'N/A' },
  bematechStatus: { type: String, default: 'N/A' },
  totemType: { type: String, default: 'N/A' },
}, {
  // timestamps: true, // Descomente se quiser os campos createdAt e updatedAt
  versionKey: false // Não cria o campo __v
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;