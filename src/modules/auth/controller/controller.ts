/* Libraries */
import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";

/* Application Modules */
import responseHandler from "../../../common/responseHandler";
import asyncHandler from "../../../common/middleware/asyncHandler";
import config from "../../../config/appConfig";

class AuthController {
  public createUserJWT = asyncHandler(async (req: Request, res: Response) => {
    const refreshId = req.body.userId + config.jwt.secret;
    const salt = crypto.createSecretKey(crypto.randomBytes(16));
    const hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");

    req.body.refreshKey = salt.export();

    const accessToken = jwt.sign(req.body, config.jwt.secret, {
      expiresIn: config.jwt.tokenExpiration
    });

    delete req.body.refreshKey;

    const userAuth = { accessToken, refreshToken: hash, user: req.body };
    responseHandler.successResponse("Login successful", userAuth, res);
  });
}

export default new AuthController();
