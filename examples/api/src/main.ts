import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config();

  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Business Service is running on http://localhost:${PORT}`);
}

bootstrap();
