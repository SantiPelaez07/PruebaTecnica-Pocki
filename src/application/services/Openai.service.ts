import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY no está definido en las variables de entorno',
      );
    }

    this.client = new OpenAI({ apiKey });
  }

  async detectIntent(message: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Eres un asistente que identifica si este mensaje necesita usar alguna herramienta. Devuelve solo el nombre de la herramienta en minúsculas o "ninguna". Mensaje: "${message}"`,
          },
        ],
      });

      const rawResponse = completion.choices?.[0]?.message?.content;

      return rawResponse?.trim().toLowerCase() || 'ninguna';
    } catch (error) {
      console.error('Error detectando intención:', error);
      return 'ninguna';
    }
  }
}
