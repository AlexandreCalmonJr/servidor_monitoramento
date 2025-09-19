// Ficheiro: src/controllers/deviceController.js
// ---------------------------------------------
// O 'Controlador' (Controller) lida com a lógica da requisição HTTP. Ele recebe
// a requisição, chama os serviços apropriados para executar a lógica de negócio
// e, finalmente, envia a resposta de volta ao cliente.

const deviceService = require('../services/deviceService');
const ipMappingService = require('../services/ipMappingService');

/**
 * Lida com os dados recebidos do agente de monitoramento.
 */
const handleMonitoringData = async (req, res) => {
  try {
    const data = req.body;
    // Extrai o IP do cliente da requisição
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Mapeia a localização com base no IP
    const location = ipMappingService.getLocationFromIp(clientIp);

    // Adiciona os dados de IP e localização ao objeto
    const completeData = {
      ...data,
      ipAddress: clientIp.split(':').pop(), // Limpeza para IPv4 em ambiente IPv6
      location,
    };

    // Usa o serviço para criar ou atualizar o dispositivo no banco de dados
    const device = await deviceService.createOrUpdateDevice(completeData);
    
    res.status(200).json({ message: 'Dados processados com sucesso!', deviceId: device.id });
  } catch (error) {
    console.error("Erro no controlador handleMonitoringData:", error.message);
    res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
  }
};

/**
 * Obtém todos os dispositivos para o painel de controlo.
 */
const getAllDevices = async (req, res) => {
  try {
    const devices = await deviceService.findAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    console.error("Erro no controlador getAllDevices:", error.message);
    res.status(500).json({ message: "Erro ao buscar dispositivos." });
  }
};

/**
 * Obtém um dispositivo específico pelo seu ID.
 */
const getDeviceById = async (req, res) => {
  try {
    const device = await deviceService.findDeviceById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }
    res.status(200).json(device);
  } catch (error) {
    console.error("Erro no controlador getDeviceById:", error.message);
    res.status(500).json({ message: "Erro ao buscar o dispositivo." });
  }
};

module.exports = {
  handleMonitoringData,
  getAllDevices,
  getDeviceById,
};

