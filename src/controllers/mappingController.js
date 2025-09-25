// Ficheiro: src/controllers/mappingController.js
// DESCRIÇÃO: Corrigido para garantir que a exportação dos métodos é feita corretamente.

const mappingService = require('../services/mappingService');

// As funções agora são exportadas diretamente em vez de estarem numa classe.
// Esta é a correção principal.

exports.getMappings = async (req, res) => {
  try {
    const mappings = await mappingService.getAll();
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mapeamentos.', error: error.message });
  }
};

exports.createMapping = async (req, res) => {
  try {
    const mapping = await mappingService.create(req.body);
    res.status(201).json(mapping);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar mapeamento.', error: error.message });
  }
};

exports.deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;
    await mappingService.delete(id);
    res.status(200).json({ message: 'Mapeamento eliminado com sucesso.' });
  } catch (error) {
    res.status(404).json({ message: 'Erro ao eliminar mapeamento.', error: error.message });
  }
};

