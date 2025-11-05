const feeMap = {
  'costa e silva': 10,
  'america': 12,
  'anita garibaldi': 12,
  'atiradores': 12,
  'bom retiro': 12,
  'bucarein': 12,
  'centro': 12,
  'iririu': 12,
  'saguacu': 12,
  'gloria': 15,
  'guanabara': 15,
  'jardim iririu': 15,
  'jardim sofia': 15,
  'vila nova': 15,
  'zona industrial norte': 15
};

function normalizeString(str) {
  if (!str) return '';
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { cep } = req.body;
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      return res.status(400).json({ error: 'CEP inválido. Deve conter 8 dígitos.' });
    }

    const viaCepUrl = `https://viacep.com.br/ws/${cleanCep}/json/`;
    const response = await fetch(viaCepUrl);
    
    if (!response.ok) throw new Error('Falha ao contatar o serviço de CEP.');

    const data = await response.json();

    if (data.erro) {
      return res.status(400).json({ error: 'CEP não encontrado. Verifique e tente novamente.' });
    }

    const neighborhood = data.bairro;
    const normalizedNeighborhood = normalizeString(neighborhood);
    const fee = feeMap[normalizedNeighborhood];

    if (fee) {

      return res.status(200).json({ 
        fee: fee,
        neighborhood: data.bairro,
        street: data.logradouro,
        city: data.localidade,
        state: data.uf
      });
      
    } else {
      return res.status(400).json({ 
        error: `Desculpe, não entregamos no bairro: ${neighborhood}` 
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao calcular a taxa.' });
  }
}