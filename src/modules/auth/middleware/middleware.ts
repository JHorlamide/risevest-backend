/* Libraries */
import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";

/* Application Modules */
import requestBodyValidator from "../../../common/middleware/requestValidation";
import apiService from "../../api/services/service"
import responseHandler from "../../../common/responseHandler";
import { userLogin} from "../validation/validation.schema";

class AuthMiddleware {
  public validateReqAuthFields = requestBodyValidator(userLogin);

  public async verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await apiService.getUserByEmail(email);

      if (!user) return responseHandler.badRequest("User not found", res);

      if (await argon2.verify(user.password, password)) {
        req.body = {
          userId: user.id,
          email: user.email,
          name: user.name,
        }

        return next();
      }

      return responseHandler.badRequest("Invalid email and/or password", res);
    } catch (error: any) {
      return responseHandler.badRequest(error.message, res);
    }
  }
}

export default new AuthMiddleware();
