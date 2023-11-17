import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticaticated;
    }
}