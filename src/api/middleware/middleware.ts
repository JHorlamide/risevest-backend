import { Request, Response, NextFunction } from "express";
import requestBodyValidator from "../../common/middleware/requestValidation";
import { userSchema, postSchema, commentSchema } from "../validation/validation.schema";
import responseHandler from "../../common/responseHandler";
import apiService from "../services/service"

class APIMiddleware {
  validateRegUserBody = requestBodyValidator(userSchema);

  validatePostBody = requestBodyValidator(postSchema);

  validateCommentsBody = requestBodyValidator(commentSchema);

  async validatePostExist(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const post = await apiService.getPostById(parseInt(postId));
    if (!post) return responseHandler.badRequest("Post not found", res);
    next();
  }

  async validateUserExist(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await apiService.getUserById(parseInt(userId));

    if (!user) return responseHandler.badRequest("User not found", res);

    next();
  }

  async validateUserAlreadyExist(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      const user = await apiService.getUserByEmail(email);

      if (user) return responseHandler.badRequest("User already exist", res);

      next();
    } catch (error: any) {
      responseHandler.serverError(error.message, res);
    }
  }
}

export default new APIMiddleware();
