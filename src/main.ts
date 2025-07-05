import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // 👈 Allow your frontend's origin
    credentials: true, // 👈 Allow cookies if needed
  });

  await app.listen(3000);
}
bootstrap();
