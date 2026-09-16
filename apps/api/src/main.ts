import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });
  const config = app.get(ConfigService);

  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  // Toute propriete non declaree dans un DTO est rejetee.
  // Premiere brique de la section 36 : ne jamais faire confiance au navigateur.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  // Le navigateur ne parle jamais directement a l'API : il passe par le BFF
  // Next.js (decision D1). CORS n'est ouvert que pour les outils de dev.
  app.enableCors({
    origin: config.getOrThrow<string>('WEB_ORIGIN'),
    credentials: true,
  });

  app.enableShutdownHooks();

  const port = Number(config.get('PORT') ?? 4000);
  await app.listen(port);

  console.log(`AnkEdu API -> http://localhost:${port}/api`);
}

await bootstrap();
