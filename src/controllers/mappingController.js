// Ficheiro: src/controllers/mappingController.js
// DESCRIÇÃO: Corrigido o erro 'undefined' ao usar a exportação direta de funções.

const mappingService = require('../services/mappingService');

// Retorna todos os mapeamentos
exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await mappingService.getAll();
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter mapeamentos', error: error.message });
  }
};

// Cria um novo mapeamento
exports.createMapping = async (req, res) => {
  try {
    const { location, ipStart, ipEnd } = req.body;
    if (!location || !ipStart || !ipEnd) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const newMapping = await mappingService.create(location, ipStart, ipEnd);
    res.status(201).json(newMapping);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar mapeamento', error: error.message });
  }
};

// Elimina um mapeamento por ID
exports.deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await mappingService.deleteById(id);
    if (!result) {
      return res.status(404).json({ message: 'Mapeamento não encontrado.' });
    }
    res.status(200).json({ message: 'Mapeamento eliminado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao eliminar mapeamento', error: error.message });
  }
};
