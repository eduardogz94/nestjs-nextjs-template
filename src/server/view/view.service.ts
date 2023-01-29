import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';
import { LoggerService } from '../shared/logger/logger';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.loggerService.debug('Initializing Next.js server...');
    try {
      this.server = createServer({
        dev: this.configService.get<string>('NODE_ENV') !== 'production',
        dir: './src/client',
      });
      await this.server.prepare();
      this.loggerService.log('Next.js server initialized.');
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
