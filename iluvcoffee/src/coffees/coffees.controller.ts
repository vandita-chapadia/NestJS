import { Body, Controller, Delete, Get, Param ,Patch,Post, Query, SetMetadata, UsePipes, ValidationPipe} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { setTimeout } from 'timers/promises';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('coffees')
@ApiTags('coffees')
@UsePipes(ValidationPipe)
export class CoffeesController {

    constructor(private readonly coffeesService:CoffeesService){}
    @Public()
    @Get()
    async findAll(@Protocol('https') protocol:string,@Query() paginationQuery:PaginationQueryDto){
        // await new Promise (resolve => setTimeout(resolve,5000))
        console.log(protocol)
        return this.coffeesService.findAll(paginationQuery);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:string){
        console.log(id);
       return this.coffeesService.findOne(id);
    }

    @Public()
    @Post()
    create(@Body() createCoffeeDto:CreateCoffeeDto){
       return this.coffeesService.create(createCoffeeDto);
    }

    @Public()
    @Patch(':id')
    update(@Param('id') id:string , @Body(ValidationPipe) updateCoffeeDto:UpdateCoffeeDto){
        return this.coffeesService.update(id,updateCoffeeDto)
    }
 
    @Public()
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.coffeesService.remove(id)
    }
}
 