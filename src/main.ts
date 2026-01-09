import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // NestJS는 AppModule로부터 모듈을 확장해간다. 시작점.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); // nestJS실행하는 함수
