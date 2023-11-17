import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './gaurds/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middlewre/logging/logging.middleware';

@Module({ imports:[ConfigModule],providers:[{provide: APP_GUARD,useClass:ApiKeyGuard}]})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
