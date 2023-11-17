import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService { 
    supplyPower(watts:number){
     console.log(`Suppliing ${watts} worth of power`)
    }
}
