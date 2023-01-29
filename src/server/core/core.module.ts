import { ClassSerializerInterceptor, Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerService } from '../shared/logger/logger';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    LoggerService,
  ],
  exports: [LoggerService],
})
export class CoreModule {}
