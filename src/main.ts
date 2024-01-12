import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Handle CORS.
  app.enableCors();

  // Handle validation pipeline for payload.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Give prefix for API endpoints.
  app.setGlobalPrefix('api');

  // Added swagger for this project.
  const config = new DocumentBuilder()
    .setTitle('Practical with Nest JS')
    .setDescription('Login and Registration and CRUD operation with Nest JS.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('CRUD')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
