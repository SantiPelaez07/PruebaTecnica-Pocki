import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Message } from './Message.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  answer!: string;

  @ManyToOne(() => Message, (message) => message.responses)
  message!: Message;

  @CreateDateColumn()
  createdAt!: Date;
}
