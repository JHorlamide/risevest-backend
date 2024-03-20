import { Request, Response } from "express";
import responseHandler from "../../common/responseHandler";
import asyncHandler from "../../common/middleware/asyncHandler";
import apiService from "../services/service"

class APIController {
  /* User */ 
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await apiService.createUser({ name, email });
    responseHandler.successfullyCreated("User created successfully", user, res);
  })

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await apiService.getUsers();
    responseHandler.successResponse("Users fetched successfully", users, res);
  })

  getUserWithComments = asyncHandler(async (req: Request, res: Response) => {
    const userWithComments = apiService.topUsersWithLatestComments();
    responseHandler.successResponse("Success", userWithComments, res); 
  })

  /* Post */ 
  createPost = asyncHandler(async (req: Request, res: Response) => {
    const { title, content, published, authorId } = req.body;
    const post = await apiService.createPost({
      title,
      content,
      published,
      authorId
    });
    responseHandler.successfullyCreated("Post created successfully", post, res);
  })
 
  getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params
    const posts = await apiService.getUserPosts(parseInt(userId));
    responseHandler.successfullyCreated("Post created successfully", posts, res);
  })
 
  /* Comments */ 
  createPostComment = asyncHandler(async (req: Request, res: Response) => {
    const { content, postId } = req.body;
    const comment = await apiService.createComment({ content, postId });
    responseHandler.successfullyCreated("Comment created successfully", comment, res);
  })
}

export default new APIController();
