import axios, { AxiosResponse } from 'axios';
// import * as cheerio from 'cheerio';

export async function getTRM(): Promise<string> {
  try {
    const url = 'https://co.dolarapi.com/v1/trm';

    const response: AxiosResponse<{ valor: string }> = await axios.get(url);

    // const $ = cheerio.load(response.data);

    const trm = response.data.valor;

    if (!trm) return 'No se pudo obtener la TRM';

    const formattedTRM = parseFloat(trm).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `La TRM actual está en ${formattedTRM}`;
  } catch (error) {
    console.error('Error al obtener TRM:', error);
    return 'Error consultando la TRM';
  }
}
