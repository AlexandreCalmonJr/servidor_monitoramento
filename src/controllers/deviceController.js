// Ficheiro: src/controllers/deviceController.js
// DESCRIÇÃO: Corrigido para usar a exportação direta de funções, resolvendo o erro 'undefined'.

const deviceService = require('../services/deviceService');
const ipMappingService = require('../services/ipMappingService');

/**
 * Lida com os dados de monitoramento recebidos de um agente.
 */
exports.handleDeviceData = async (req, res) => {
  try {
    const data = req.body;
    // Ouve o IP de origem da requisição para mapear a localização
    const clientIp = req.socket.remoteAddress?.split(':').pop() || req.ip;
    const location = await ipMappingService.getLocationFromIp(clientIp);

    // Adiciona o IP e a localização aos dados antes de salvar
    const fullData = { ...data, ip: clientIp, location: location };

    const device = await deviceService.createOrUpdate(fullData);
    res.status(200).json({
      message: 'Dados recebidos e processados com sucesso.',
      deviceId: device._id,
      location: location
    });
  } catch (error) {
    console.error('Erro em handleDeviceData:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao processar dados.', error: error.message });
  }
};

/**
 * Retorna uma lista de todos os dispositivos monitorados.
 */
exports.getDevices = async (req, res) => {
  try {
    const devices = await deviceService.getAll();
    res.status(200).json(devices);
  } catch (error) {
    console.error('Erro em getDevices:', error);
    res.status(500).json({ message: 'Erro ao buscar dispositivos.', error: error.message });
  }
};

