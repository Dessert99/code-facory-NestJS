import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
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

@Injectable() // 이 태그가 있어야 provider로 사용할 수 있다.
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id); // find: 찾는 값이 없다면 undefined 반환
    if (!post) {
      throw new NotFoundException(); // 찾는 게시글이 없으면 예외 에러 (404)
    }
    return post;
  }

  createPost(author: string, title: string, content: string) {
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

  upDatePost(
    postId: number,
    author?: string,
    title?: string,
    content?: string,
  ) {
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return post;
  }

  deletePost(id: number) {
    const post = posts.find((post) => post.id === id); // find: 찾는 값이 없다면 undefined 반환

    if (!post) {
      throw new NotFoundException(); // 찾는 게시글이 없으면 예외 에러 (404)
    }

    posts = posts.filter((post) => post.id !== id); // 삭제할 id 빼고 새로운 배열

    return id; // 삭제된 id 반환
  }
}
