import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
interface ClassConstructuor {
    new (...args: any[]): {};
}
export declare function Serialize(dto: ClassConstructuor): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: any);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>;
}
export {};
