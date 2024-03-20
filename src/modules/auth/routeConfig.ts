/* Libraries */
import { Application } from "express";

/* Application Modules */
import config from "../../config/appConfig";
import jwtMiddleware from "./middleware/jwtMiddleware";
import authMiddleware from "./middleware/middleware";
import authController from "./controller/controller";
import { CommonRoutesConfig } from "../../common/commonRouteConfig";

const APP_PREFIX_PATH = config.prefix;

export class AuthRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "AuthRoute")
  }

  configureRoutes(): Application {
    /***
    * @route  POST /api/users/login.
    * @desc    User authentication.
    * @access  Public.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/users/login`, [
      authMiddleware.validateReqAuthFields,
      authMiddleware.verifyPassword,
      authController.createUserJWT
    ])

    /***
    * @route  POST /api/user/refresh-token.
    * @desc   Get authentication refresh token.
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/users/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createUserJWT
    ])

    return this.app;
  }
}
