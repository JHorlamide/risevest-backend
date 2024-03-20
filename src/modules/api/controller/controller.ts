import { Request, Response } from "express";
import argon2 from "argon2";
import responseHandler from "../../../common/responseHandler";
import asyncHandler from "../../../common/middleware/asyncHandler";
import apiService from "../services/service";

class APIController {
  /* User */
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const { password } = req.body;
    const passwordHash = await argon2.hash(password);
    const user = await apiService.createUser({ ...req.body, password: passwordHash });
    responseHandler.successfullyCreated("User created successfully", user, res);
  })

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await apiService.getUsers();
    responseHandler.successResponse("Users fetched successfully", users, res);
  })

  getUserWithComments = asyncHandler(async (req: Request, res: Response) => {
    const userWithComments = apiService.getTopUsersWithLatestComments();
    responseHandler.successResponse("Success", userWithComments, res);
  })

  /* Post */
  createPost = asyncHandler(async (req: Request, res: Response) => {
    const { title, content, published } = req.body;
    const { userId } = res.locals.jwt;

    const post = await apiService.createPost({
      title,
      content,
      published,
      authorId: userId
    });

    responseHandler.successfullyCreated("Post created successfully", post, res);
  })

  getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const posts = await apiService.getUserPosts(parseInt(userId));
    responseHandler.successResponse("Post fetched successfully", posts, res);
  })

  /* Comments */
  createPostComment = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await apiService.createComment({ content, postId: parseInt(postId) });
    responseHandler.successfullyCreated("Comment created successfully", comment, res);
  })
}

export default new APIController();
