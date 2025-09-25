// Ficheiro: src/controllers/deviceController.js
// DESCRIÇÃO: Corrigido o problema do IPv6 mapeado (::ffff:) para extrair apenas o IP IPv4 real.

const deviceService = require('../services/deviceService');
const { getLocationFromIp } = require('../services/ipMappingService');

/**
 * Função auxiliar para limpar e extrair o IP real
 * Remove prefixos IPv6 e formatação desnecessária
 */
function cleanIpAddress(rawIp) {
  if (!rawIp) return null;
  
  // Remove o prefixo IPv6-to-IPv4 mapping
  if (rawIp.startsWith('::ffff:')) {
    return rawIp.substring(7); // Remove "::ffff:"
  }
  
  // Se for uma lista separada por vírgulas (x-forwarded-for), pega o primeiro
  if (rawIp.includes(',')) {
    return rawIp.split(',')[0].trim();
  }
  
  // Remove colchetes se existirem (formato IPv6)
  return rawIp.replace(/[\[\]]/g, '');
}

/**
 * Lida com os dados enviados pelo agente de monitoramento.
 * Captura o IP, encontra a localização e cria/atualiza o dispositivo.
 */
exports.handleDeviceData = async (req, res) => {
  try {
    const data = req.body;

    // --- LOG DE DEPURAÇÃO ADICIONADO ---
    console.log('--- DADOS RECEBIDOS DO AGENTE ---');
    console.log(JSON.stringify(data, null, 2));
    // ------------------------------------

    // Captura o IP bruto
    const rawIp = req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress ||
                  (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Limpa e extrai o IP real
    const cleanIp = cleanIpAddress(rawIp);
    
    // --- LOG DE DEPURAÇÃO PARA IP ---
    console.log(`IP Bruto: ${rawIp}`);
    console.log(`IP Limpo: ${cleanIp}`);
    // ---------------------------------

    data.ip = cleanIp;

    const location = await getLocationFromIp(cleanIp);
    data.location = location;
    
    // --- LOG DE DEPURAÇÃO ADICIONADO ---
    console.log(`IP Final: ${cleanIp}, Localização Mapeada: ${location}`);
    // ------------------------------------

    const device = await deviceService.createOrUpdate(data);

    // --- LOG DE DEPURAÇÃO ADICIONADO ---
    console.log('--- DADOS SALVOS/ATUALIZADOS NO BANCO ---');
    console.log(JSON.stringify(device, null, 2));
    // ------------------------------------

    res.status(200).json({
      message: 'Dados recebidos com sucesso!',
      deviceId: device._id,
      location: device.location,
      cleanIp: cleanIp // Inclui o IP limpo na resposta para verificação
    });
  } catch (error) {
    console.error('Erro em handleDeviceData:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao processar os dados.', error: error.message });
  }
};

/**
 * Retorna uma lista de todos os dispositivos monitorizados.
 */
exports.getDevices = async (req, res) => {
  try {
    const devices = await deviceService.getAll();
    res.status(200).json(devices);
  } catch (error) {
    console.error('Erro em getDevices:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao processar os dados.', error: error.message });
  }
};