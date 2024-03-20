import { ClientError, ServerError } from "../../../common/exceptions/APIError";
import { userRepository, postRepository, commentRepository } from "../repository/repository";
import { IUser, IPost, IComment } from "../types/types";

class APIService {
  /* User Service */ 
  async createUser(user: IUser) {
    try {
      if (!user.email || !user.name) throw new ClientError("User name and email is required");

      return await userRepository.createUser(user);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUsers() {
    try {
      return await userRepository.getUsers();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUserById(id: number) {
    try {
      if (!id) throw new ClientError("ID is required");
      return await userRepository.getUserById(id);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUserByEmail(email: string) {
    try {
      if (!email) throw new ClientError("Email is required");
      return await userRepository.getUserByEmail(email);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getTopUsersWithLatestComments() {
    try {
      return await userRepository.getTopUsersWithLatestComments();
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  /* Post Service */
  async createPost(post: IPost) {
    if(!post.authorId || !post.content || !post.published || !post.title) {
      throw new ClientError("Post title, content, published, and authorId is required");
    }

    try {
      return await postRepository.createPost(post);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getUserPosts(userId: number) {
    if (!userId) throw new ClientError("User ID is required");

    try {
      return await postRepository.getUserPosts(userId);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  async getPostById(postId: number) {
    if (!postId) throw new ClientError("Post ID is required");

    try {
      return await postRepository.getPostById(postId);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  /* Comment Service */
  async createComment(comment: IComment) {
    if (!comment.content || !comment.postId) {
      throw new ClientError("Comment content and postId is required");
    }

    try {
      return await commentRepository.createComment(comment);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }
}

export default new APIService();
