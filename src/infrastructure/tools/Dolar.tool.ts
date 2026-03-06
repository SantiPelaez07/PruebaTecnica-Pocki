import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';

export async function getTRM(): Promise<string> {
  try {
    const url = 'https://www.banrep.gov.co/es/glosario/tasa-cambio-trm';

    const response: AxiosResponse<string> = await axios.get(url, {
      responseType: 'text',
    });

    const $ = cheerio.load(response.data);

    const trm: string = $('div.indicator_value').first().text().trim();

    if (!trm) return 'No se pudo obtener la TRM';

    return `La TRM actual es ${trm} COP`;
  } catch (error) {
    console.error('Error al obtener TRM:', error);
    return 'Error consultando la TRM';
  }
}
