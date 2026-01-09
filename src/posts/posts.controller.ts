import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET /posts
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // GET /posts/:id
  @Get(':id')
  // URL에 있는 'id' 값을 추출해서 매개변수 id에 할당
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  // POST /posts
  @Post() //HTTP POST 요청을 받아들이는 '핸들러'임을 선언 (기본 응답 상태코드: 201 Created)
  postPosts(
    //@Body('키') : 요청 본문(JSON) 안에 있는 특정 필드값만 쏙 뽑아서 매개변수에 넣어줌
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  // PUT /posts/:id
  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string, // 옵셔널 -> 수정할 수도 있고 안할 수도 있다.
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.upDatePost(+id, author, title, content);
  }

  // DELETE /posts/:id
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
