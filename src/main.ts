import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const PORT = process.env.PORT || 5001;

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());

  const VERSION = '1.0.0';
  const config = new DocumentBuilder()
    .setTitle('Mevoc documentation')
    .setDescription('Mevoc documentation REST API')
    .setVersion(VERSION)
    .addTag('Mevoc')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api/docs/v/${VERSION}`, app, document);

  app.useLogger(new Logger());

  await app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT);
  });
}
bootstrap();
