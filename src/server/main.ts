import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { MainModule } from 'src/server/main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
