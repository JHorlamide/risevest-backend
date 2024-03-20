import { PrismaClient, User, Post, Comment } from "@prisma/client";
import { IUser, IPost, IComment } from "../types/types";

class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(userData: IUser): Promise<User> {
    return await this.prisma.user.create({ data: userData });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async getUserById(userId: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  async getTopUsersWithLatestComments() {
    return await this.prisma.user.findMany({
      take: 3,
      orderBy: {
        posts: {
          _count: 'desc',
        },
      },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            comments: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
              select: {
                content: true,
              },
            },
          },
        },
      },
    });
  }
}

class PostRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPost(post: IPost): Promise<Post> {
    return await this.prisma.post.create({ data: post })
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { authorId: userId }
    })
  }

  async getPostById(postId: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({
      where: { id: postId }
    })
  }
}

class CommentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createComment(comment: IComment): Promise<Comment> {
    return await this.prisma.comment.create({ data: comment });
  }
}

export const userRepository = new UserRepository();

export const postRepository = new PostRepository();

export const commentRepository = new CommentRepository();