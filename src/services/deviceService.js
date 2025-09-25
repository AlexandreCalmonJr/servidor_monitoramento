// Ficheiro: src/services/deviceService.js
// DESCRIÇÃO: Corrigido para usar a exportação direta de funções, resolvendo o erro '... is not a function'.

const Device = require('../models/Device');

/**
 * Cria um novo dispositivo se não existir, ou atualiza um existente.
 * A identificação única é feita pelo serialNumber.
 */
exports.createOrUpdate = async (data) => {
  const { serialNumber } = data;

  // Procura um dispositivo com o mesmo número de série.
  const existingDevice = await Device.findOne({ serialNumber });

  if (existingDevice) {
    // Se o dispositivo já existe, atualiza os seus dados.
    Object.assign(existingDevice, data);
    existingDevice.lastSeen = new Date(); // Atualiza a data do último contacto
    return await existingDevice.save();
  } else {
    // Se não existe, cria um novo registo.
    const newDevice = new Device(data);
    return await newDevice.save();
  }
};

/**
 * Retorna todos os dispositivos da base de dados, ordenados pelo último contacto.
 * Também calcula o status (Online/Offline) em tempo real.
 */
exports.getAll = async () => {
  const devices = await Device.find({}).sort({ lastSeen: -1 }).lean();

  // Adiciona um campo 'status' dinâmico a cada dispositivo antes de o enviar
  const devicesWithStatus = devices.map(device => {
    const now = new Date();
    // Considera offline se o último contacto foi há mais de 2 minutos
    const isOffline = (now - new Date(device.lastSeen)) > (2 * 60 * 1000); 

    let status = 'Online';
    if (isOffline) {
      status = 'Offline';
    } else if (device.printerStatus && device.printerStatus.toLowerCase().includes('error')) {
      // Pode adicionar mais lógicas de erro aqui se desejar
      status = 'Erro';
    }
    
    return { ...device, status };
  });

  return devicesWithStatus;
};

