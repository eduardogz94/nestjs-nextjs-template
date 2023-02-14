import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { MainModule } from './code/main.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(MainModule, { bufferLogs: true });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    cors({
      origin: '*',
      credentials: true,
      exposedHeaders: 'Authorization',
      allowedHeaders: 'authorization, content-type',
    }),
  );
  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('NestJS application')
      .setDescription('')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('v1' + '/api', app, swaggerDoc);
  }
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
