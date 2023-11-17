import { PassportStrategy } from "@nestjs/passport";
import {Strategy,ExtrcatJwt} from 'passport-jwt'
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(){super({
 secretOrKey:'SECRECT'  ,
 ignoreExpiration:false ,
 jwtFromRequest: ExtrcatJwt.fromAuthHeaderAsBearerToken()
})}

async validate(payload:any){
    return {
        id:payload.sub,
        name:payload.name,
    }
}
}