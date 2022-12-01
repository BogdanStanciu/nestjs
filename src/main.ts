import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const port = parseInt(process.env.BACKEND_PORT, 10)
    ? parseInt(process.env.BACKEND_PORT, 10)
    : 3000;
  // On application bootstrap in AppService init admin user
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJs template API')
    .setDescription('API v0.1')
    .setVersion('v0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
  logger.log(`Listen on port ${port}`);
}
bootstrap();
