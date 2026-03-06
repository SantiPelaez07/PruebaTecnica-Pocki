import { Response } from '../../../domain/entities/ResponseMessage.entity';

export class ChatResponseDto {
  id!: number;
  userPhone!: string;
  question!: string;
  toolUsed!: string;
  createdAt!: Date;
  responses!: { id: number; answer: string }[];

  static fromEntity(message: {
    id: number;
    userPhone: string;
    question: string;
    toolUsed: string;
    createdAt: Date;
    responses?: Response[];
  }): ChatResponseDto {
    const dto = new ChatResponseDto();
    dto.id = message.id;
    dto.userPhone = message.userPhone;
    dto.question = message.question;
    dto.toolUsed = message.toolUsed;
    dto.createdAt = message.createdAt;
    dto.responses =
      message.responses?.map((r) => ({
        id: r.id,
        answer: r.answer,
        createdAt: r.createdAt,
      })) || [];
    return dto;
  }
}
