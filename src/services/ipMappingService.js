// Ficheiro: src/services/ipMappingService.js
// -----------------------------------------
// Este serviço contém uma lógica de negócio específica e reutilizável:
// mapear um endereço IP a uma localização física pré-definida.

// No futuro, esta configuração pode ser movida para o banco de dados para ser dinâmica.
const networkMap = {
  '10.71.2.': 'Salvador',
  '10.80.1.': 'Feira de Santana',
  '192.168.1.': 'Escritório Central',
  '127.0.0.1': 'Localhost',
  '::1': 'Localhost',
  // Adicione outras sub-redes e suas respectivas localizações aqui
};

/**
 * Obtém o nome da localização com base no endereço IP.
 * @param {string} ip O endereço IP a ser verificado.
 * @returns {string} O nome da localização ou 'Localização Desconhecida'.
 */
function getLocationFromIp(ip) {
  if (!ip) return 'IP Inválido';

  // Trata casos de IPv4 mapeado em endereço IPv6
  const cleanIp = ip.includes(':') ? ip.split(':').pop() : ip;

  for (const networkPrefix in networkMap) {
    if (cleanIp.startsWith(networkPrefix)) {
      return networkMap[networkPrefix];
    }
  }
  return 'Localização Desconhecida';
}

module.exports = {
  getLocationFromIp,
};

