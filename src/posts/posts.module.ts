import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService], // 의존성 주입 핵심. IoC 컨테이너 등록
})
export class PostsModule {}
