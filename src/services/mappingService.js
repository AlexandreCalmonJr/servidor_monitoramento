// Ficheiro: src/services/mappingService.js
// DESCRIÇÃO: Serviço atualizado para criar mapeamentos com a nova estrutura de faixa de IP.

const Mapping = require('../models/Mapping');

exports.getAll = async () => {
  return Mapping.find({}).sort({ location: 1 });
};

exports.create = async (location, ipStart, ipEnd) => {
  const newMapping = new Mapping({ location, ipStart, ipEnd });
  return newMapping.save();
};

exports.deleteById = async (id) => {
  return Mapping.findByIdAndDelete(id);
};

