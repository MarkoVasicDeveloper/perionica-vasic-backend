/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { photoConfig } from 'config/photo.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(photoConfig.destination, {
    prefix: photoConfig.urlPrefixPhoto,
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
