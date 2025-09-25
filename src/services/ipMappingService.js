// Ficheiro: src/services/ipMappingService.js
// DESCRIÇÃO: Corrigido o erro 'Cannot read properties of undefined' ao adicionar uma verificação de segurança.

const ipaddr = require('ip-address');
const Mapping = require('../models/Mapping');

/**
 * Converte um endereço de IP para um formato numérico padronizado.
 * Lida com IPv4 e IPv6 (incluindo o prefixo ::ffff:).
 * @param {string} ip O endereço de IP a ser convertido.
 * @returns {BigInt} A representação numérica do IP.
 */
function ipToBigInt(ip) {
  // --- A CORREÇÃO ESTÁ AQUI ---
  // Adicionamos uma verificação para garantir que o IP não é nulo ou indefinido
  // antes de tentarmos usar o método 'startsWith'.
  if (!ip) {
    console.warn('Tentativa de converter um IP nulo ou indefinido. Verifique os mapeamentos na base de dados.');
    return BigInt(0);
  }

  const cleanedIp = ip.startsWith('::ffff:') ? ip.substring(7) : ip;
  
  try {
    const address = new ipaddr.Address4(cleanedIp);
    return BigInt(address.bigInteger());
  } catch (e) {
    // Tenta como IPv6 se falhar como IPv4
    try {
      const address = new ipaddr.Address6(cleanedIp);
      return BigInt(address.bigInteger());
    } catch (err) {
      console.error(`IP inválido após limpeza: ${cleanedIp}`);
      return BigInt(0);
    }
  }
}

/**
 * Encontra a localização correspondente a um endereço de IP.
 * @param {string} clientIp O IP do cliente.
 * @returns {Promise<string>} O nome da localização ou 'Localização Desconhecida'.
 */
async function getLocationFromIp(clientIp) {
  if (!clientIp) return 'Localização Desconhecida';

  try {
    const mappings = await Mapping.find({});
    if (mappings.length === 0) return 'Localização Desconhecida';

    const clientIpNum = ipToBigInt(clientIp);

    for (const mapping of mappings) {
      const startIpNum = ipToBigInt(mapping.ipStart);
      const endIpNum = ipToBigInt(mapping.ipEnd);

      if (clientIpNum >= startIpNum && clientIpNum <= endIpNum) {
        return mapping.location;
      }
    }

    return 'Localização Desconhecida';
  } catch (error) {
    console.error('Erro ao mapear localização:', error);
    return 'Erro de Mapeamento';
  }
}

module.exports = { getLocationFromIp };

