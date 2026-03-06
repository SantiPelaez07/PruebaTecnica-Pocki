import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatService } from '../../application/services/Chat.service';
import { CreateMessageDto } from '../../application/dto/Request/CreateMessageDto';
import { ChatResponseDto } from 'src/application/dto/Response/ChatResponseDto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async postMessage(@Body() dto: CreateMessageDto): Promise<ChatResponseDto> {
    const result = await this.chatService.postMessage(dto);
    return result;
  }

  @Get(':id')
  async getMessage(@Param('id', ParseIntPipe) id: number) {
    const message = await this.chatService.getMessageById(id);
    return message;
  }

  @Get()
  async getAllMessages() {
    return this.chatService.getAllMessages();
  }
}
