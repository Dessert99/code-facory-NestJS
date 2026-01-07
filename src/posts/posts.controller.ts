import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newoffilc',
    title: '뉴민스 민지',
    content: '안녕',
    commentCount: 12,
    likeCount: 25,
  },
  {
    id: 2,
    author: 'newoffilc',
    title: '떡볶이',
    content: '안녕야ㅣ더루니ㅑㄷ',
    commentCount: 1245,
    likeCount: 22145,
  },
  {
    id: 3,
    author: '이랴ㅓㄷ리ㅑㅓ ',
    title: 'ㅇ두댜니',
    content: 'ㅣㅑㅓㅣㅑㅓ',
    commentCount: 12202,
    likeCount: 2295,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET /posts
  @Get()
  getPosts() {
    return posts;
  }

  // GET /posts/:id
  @Get(':id')
  // URL에 있는 'id' 값을 추출해서 매개변수 id에 할당
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException(); // 찾는 게시글이 없으면 예외 에러 (404)
    }

    return post;
  }

  // POST /posts
  @Post() //HTTP POST 요청을 받아들이는 '핸들러'임을 선언 (기본 응답 상태코드: 201 Created)
  postPosts(
    //@Body('키') : 요청 본문(JSON) 안에 있는 특정 필드값만 쏙 뽑아서 매개변수에 넣어줌
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post = {
      id: posts[posts.length - 1].id + 1, //마지막 게시글 id + 1
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  // PUT /posts/:id

  // DELETE /posts/:id
}
