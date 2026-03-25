import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from 'src/posts/entities/posts.entitiy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

// postgres 세팅
@Module({
  imports: [
    PostsModule, // 다른 모듈을 불러올 때 imports 사용

    // nest - postgres 연결하기
    TypeOrmModule.forRoot({
      type: 'postgres', // 데이터베이스 타입
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostModel], //생성할 모델, DB와 연동될 모델을 넣기
      synchronize: true, // DB, TypeORM 싱크를 맞추기 (개발환경에서는 true, 프로덕션 환경에서는 DB구조가 바뀌기 떄문에 false)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// AppModule이 존재하는 건 nestJS에서 어떻게 아는가?
