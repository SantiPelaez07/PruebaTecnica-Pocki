import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './infrastructure/database/database.config';
import { Message } from './domain/entities/Message.entity';
import { Response } from './domain/entities/ResponseMessage.entity';
import { ChatController } from './infrastructure/controllers/Chat.controller';
import { ChatService } from './application/services/Chat.service';
import { OpenAIService } from './application/services/Openai.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Message, Response]),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ChatController],
  providers: [ChatService, OpenAIService],
})
export class AppModule {}
