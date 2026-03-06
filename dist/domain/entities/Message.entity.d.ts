import { Response } from './ResponseMessage.entity';
export declare class Message {
    id: number;
    userPhone: string;
    question: string;
    answer: string;
    toolUsed: string;
    createdAt: Date;
    responses: Response[];
}
