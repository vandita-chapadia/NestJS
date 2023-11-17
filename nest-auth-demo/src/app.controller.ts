import { Controller, Get,Post, UseGuards,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGaurd } from './auth/local-auth.gaurd';
import { AuthGuard } from './auth/auth.gaurd';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService:AuthService) {}


  @UseGuards(LocalAuthGaurd)
  @Post('login')
  login(@Request() req):any {
    return this.authService.login(req.user);
  }
  
  // @Get('protected')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
