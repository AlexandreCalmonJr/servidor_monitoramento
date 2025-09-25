// Ficheiro: src/services/mappingService.js
// Descrição: Contém a lógica de negócio para gerir os mapeamentos (CRUD).

const Mapping = require('../models/Mapping');

class MappingService {
  /**
   * Retorna todos os mapeamentos, ordenados pelos mais recentes.
   */
  async getAll() {
    return await Mapping.find({}).sort({ createdAt: -1 });
  }

  /**
   * Cria um novo mapeamento.
   */
  async create(data) {
    const { ipPrefix, location } = data;
    if (!ipPrefix || !location) {
      throw new Error('Prefixo de IP e localização são obrigatórios.');
    }

    const existing = await Mapping.findOne({ ipPrefix });
    if (existing) {
      throw new Error(`O prefixo de IP '${ipPrefix}' já está em uso.`);
    }

    const mapping = new Mapping({ ipPrefix, location });
    await mapping.save();
    return mapping;
  }

  /**
   * Elimina um mapeamento pelo seu ID.
   */
  async delete(id) {
    const result = await Mapping.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Mapeamento não encontrado com o ID fornecido.');
    }
    return result;
  }
}

module.exports = new MappingService();
