// Ficheiro: src/services/deviceService.js
// ---------------------------------------
// O 'Serviço' (Service) contém a lógica de negócio principal. Ele interage
// diretamente com o modelo do Mongoose para manipular dados no MongoDB.

const Device = require('../models/Device');

/**
 * Cria um novo dispositivo ou atualiza um existente com base no número de série.
 * Utiliza o método 'findOneAndUpdate' com a opção 'upsert'.
 * @param {object} deviceData Os dados completos do dispositivo recebidos do agente.
 * @returns {Promise<Device>} O documento do dispositivo do banco de dados.
 */
const createOrUpdateDevice = async (deviceData) => {
  const { serialNumber } = deviceData;

  if (!serialNumber) {
    throw new Error('Número de série é obrigatório para identificar o dispositivo.');
  }

  // Prepara os dados para atualização, incluindo o timestamp 'lastSeen'.
  const updatedData = {
    ...deviceData,
    lastSeen: new Date(),
  };

  // Encontra um documento com o serialNumber e o atualiza.
  // Se não encontrar, cria um novo ('upsert: true').
  // 'new: true' garante que o documento retornado seja a versão atualizada.
  const device = await Device.findOneAndUpdate(
    { serialNumber: serialNumber }, // Condição para encontrar o documento
    { $set: updatedData },          // Dados a serem atualizados ou inseridos
    { upsert: true, new: true }     // Opções: cria se não existir e retorna o novo doc
  );

  console.log(`Dispositivo ${device.hostname} (${device.serialNumber}) foi salvo/atualizado.`);
  
  return device;
};

/**
 * Encontra todos os dispositivos no banco de dados.
 * @returns {Promise<Array<Device>>} Uma lista de todos os dispositivos.
 */
const findAllDevices = async () => {
  // Procura todos os dispositivos e ordena por 'lastSeen' decrescente
  const devices = await Device.find().sort({ lastSeen: -1 });
  return devices;
};

/**
 * Encontra um dispositivo pelo seu ID (_id do MongoDB).
 * @param {string} id O ID do dispositivo.
 * @returns {Promise<Device|null>} O documento do dispositivo ou nulo se não encontrado.
 */
const findDeviceById = async (id) => {
  const device = await Device.findById(id);
  return device;
};

module.exports = {
  createOrUpdateDevice,
  findAllDevices,
  findDeviceById,
};

