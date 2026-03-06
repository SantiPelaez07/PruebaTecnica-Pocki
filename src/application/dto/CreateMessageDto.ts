import { IsString, IsNotEmpty } from 'class-validator';
import { Message } from 'src/domain/entities/Message.entity';

export class CreateMessageDto {
  userPhone!: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  question!: string;

  static toEntity(dto: CreateMessageDto): Message {
    const message = new Message();
    message.userPhone = dto.userPhone;
    message.question = dto.question;
    message.toolUsed = '';
    return message;
  }
}
