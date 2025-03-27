import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Prefijo global para todas las rutas
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Star Wars')
    .setDescription('API para gestionar películas de Star Wars')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Configurar Swagger con el prefijo global
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  // Habilitar CORS
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
