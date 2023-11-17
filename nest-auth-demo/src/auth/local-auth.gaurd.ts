import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable, retry } from "rxjs";

export class LocalAuthGaurd extends AuthGuard('local'){

}