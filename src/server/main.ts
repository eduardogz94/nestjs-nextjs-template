import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

// import { VersioningType } from '@nestjs/common';
import { MainModule } from 'src/server/main.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(MainModule);

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
