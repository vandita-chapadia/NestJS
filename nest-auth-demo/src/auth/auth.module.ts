import { Module, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';


@Module({
  imports:[UsersModule,PassportModule,JwtModule.register({
    secret:'SECRET',
    signOptions:{ expiresIn: '60s'}
  })],
  providers: [AuthService,LocalStrategy],
  exports:[AuthService]
})
export class AuthModule {
   

}
