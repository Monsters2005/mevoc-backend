import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5001;

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

  await app.listen(PORT, () => {
    console.log('Server started on port: ' + PORT);
  });
}
bootstrap();
