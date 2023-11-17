import { createMessagesDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
export declare class MessagesController {
    messagesService: MessagesService;
    constructor(messagesService: MessagesService);
    listMessages(): Promise<any>;
    createMessages(body: createMessagesDto): Promise<void>;
    getMessage(id: string): Promise<void>;
}
