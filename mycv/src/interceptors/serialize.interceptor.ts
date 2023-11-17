import { UseInterceptors, NestInterceptor,ExecutionContext,CallHandler} from "@nestjs/common";
import { Observable,map} from "rxjs";
import {plainToClass} from 'class-transformer'


interface ClassConstructuor{
   new(...args: any[]):{}
}
export function Serialize(dto:ClassConstructuor){
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
   
   constructor(private dto:any){

   }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> { 
     return next.handle().pipe(
        map((data:any)=>{
           return plainToClass(this.dto,data,{
            excludeExtraneousValues:true,
           }) 
        })
     )   
   }
}