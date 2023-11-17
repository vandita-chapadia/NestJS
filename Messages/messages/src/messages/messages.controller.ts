import { Body, Controller, Get, Param, Post,NotFoundException} from '@nestjs/common';
import { createMessagesDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  

    constructor(public messagesService:MessagesService){
        
    }

    @Get()
    listMessages(){
        return this.messagesService.findAll();
    }

    @Post()
    createMessages(@Body() body:createMessagesDto ){
        return this.messagesService.create(body.content);

    }

    @Get("/:id")
    async getMessage(@Param('id') id :string){
       const message= await this.messagesService.findOne(id);
       if(!message){
        throw new NotFoundException('message is not found')
       }
    }


}
