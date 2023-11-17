import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';


class MockCoffeeService{}
@Module({
    imports:[TypeOrmModule.forFeature([Coffee,Flavor,Event])],
    controllers:[CoffeesController],
    providers:[CoffeesService,{provide:COFFEE_BRANDS,useFactory:()=>["buddy bre","nescafe"]}],
    exports:[CoffeesService]
})
export class CoffeesModule {
    
}
 