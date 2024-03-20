import { Request, Response, NextFunction } from "express";
import responseHandler from "../../../common/responseHandler";
import apiService from "../services/service";
import { User } from "../types/types";

class AuthMiddleware {
  async authenticateUser(email: string) {
    return await apiService.getUserByEmail(email);
  }

  generateToken(user: User) {
    return `Bearer ${user.id}:${user.name}`;
  }

  async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return responseHandler.unAuthorizedResponse("Unauthorized. Token is required", res);
    }

    // Check if token is valid (this is just a sample check)
    const [userId] = token.split(':');
    const user = await apiService.getUserById(parseInt(userId))

    if (!user) {
      return responseHandler.forbiddenResponse("Forbidden. Token is invalid", res);
    }

    res.locals = user;
    next();
  }
}

export default new AuthMiddleware();