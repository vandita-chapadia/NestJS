import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`Hii from middleware!`)
    //res.on('finish',() => console.timeEnd('Request-respose time'))
    next();
  }
}
