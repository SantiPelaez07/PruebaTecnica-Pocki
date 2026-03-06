import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Response } from './ResponseMessage.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userPhone!: string;

  @Column()
  question!: string;

  @Column()
  answer!: string;

  @Column({ nullable: true })
  toolUsed!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Response, (response) => response.message)
  responses!: Response[];
}
