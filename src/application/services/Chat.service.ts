import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../domain/entities/Message.entity';
import { Response } from '../../domain/entities/ResponseMessage.entity';
import { CreateMessageDto } from '../dto/Request/CreateMessageDto';
import { ChatResponseDto } from '../dto/Response/ChatResponseDto';
import { getTRM } from '../../infrastructure/tools/Dolar.tool';
import { OpenAI } from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API Key no definida');
    }
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async postMessage(dto: CreateMessageDto): Promise<ChatResponseDto> {
    try {
      const message = CreateMessageDto.toEntity(dto);

      let toolUsed = 'ninguna';

      if (process.env.USE_OPENAI_MOCK === 'true') {
        if (
          dto.question.toLowerCase().includes('dolar') ||
          dto.question.toLowerCase().includes('trm')
        ) {
          toolUsed = 'dolar';
        } else {
          toolUsed = 'ninguna';
        }
      } else {
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: dto.question }],
        });
        toolUsed =
          completion.choices[0].message?.content?.trim().toLowerCase() ||
          'ninguna';
      }
      message.toolUsed = toolUsed;

      const response = new Response();

      if (toolUsed === 'dolar' || toolUsed === 'trm') {
        response.answer = await getTRM();
      } else {
        response.answer = 'No se requiere herramienta para esta pregunta.';
      }

      const savedMessage = await this.messageRepository.save(message);
      const savedResponse = await this.responseRepository.save({
        ...response,
        message: savedMessage,
      });

      savedMessage.responses = [savedResponse];
      return ChatResponseDto.fromEntity(savedMessage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Error desconocido:', error);
      }
      throw error;
    }
  }

  async getMessageById(id: number): Promise<Message> {
    if (id <= 0) {
      throw new BadRequestException('ID inválido');
    }

    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['responses'],
    });

    if (!message) {
      throw new NotFoundException(`No existe un mensaje con id ${id}`);
    }

    return message;
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find({ relations: ['responses'] });
  }
}
