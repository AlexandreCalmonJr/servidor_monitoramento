// Ficheiro: src/services/ipMappingService.js
// DESCRIÇÃO: A lógica principal foi alterada para verificar se um IP está dentro de uma faixa (range).

const Mapping = require('../models/Mapping');

// Função auxiliar para converter um endereço IP (string) num número para fácil comparação.
function ipToNumber(ip) {
  if (!ip || typeof ip !== 'string') return 0;
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

/**
 * Encontra a localização de um dispositivo com base no seu endereço IP,
 * verificando se ele se enquadra em alguma das faixas de IP definidas.
 * @param {string} ip - O endereço IP do dispositivo.
 * @returns {Promise<string>} A localização correspondente ou 'Localização Desconhecida'.
 */
async function getLocationFromIp(ip) {
  if (!ip) return 'Localização Desconhecida';

  try {
    const requestIpNum = ipToNumber(ip);
    const mappings = await Mapping.find({});

    for (const mapping of mappings) {
      const startIpNum = ipToNumber(mapping.ipStart);
      const endIpNum = ipToNumber(mapping.ipEnd);

      // Verifica se o IP do dispositivo está entre o início e o fim da faixa.
      if (requestIpNum >= startIpNum && requestIpNum <= endIpNum) {
        return mapping.location; // Retorna a primeira localização correspondente que encontrar.
      }
    }

    return 'Localização Desconhecida';
  } catch (error) {
    console.error("Erro ao mapear IP para localização:", error);
    return 'Localização Desconhecida';
  }
}

module.exports = { getLocationFromIp };

