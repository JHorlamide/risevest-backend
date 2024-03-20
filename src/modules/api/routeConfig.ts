import { Application } from "express";
import { CommonRoutesConfig } from "../../common/commonRouteConfig";
import apiMiddleware from "./middleware/middleware";
import apiController from "./controller/controller";
import jwtMiddleware from "../auth/middleware/jwtMiddleware";
import config from "../../config/appConfig";

const APP_PREFIX_PATH = config.prefix;

export class APIRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "APIRoutes");
  }

  configureRoutes() {
    /***
    * @router  POST: /api/users
    * @desc    Create new user
    * @access  Public
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/users`, [
      apiMiddleware.validateRegUserBody,
      apiMiddleware.validateUserAlreadyExist,
      apiController.createUser
    ])

    /***
    * @router  GET: /api/users
    * @desc    Get all users
    * @access  Public
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/users`, [
      jwtMiddleware.validJWTNeeded,
      apiController.getAllUsers
    ])

    /***
    * @router  POST: /api/users/:userId/posts
    * @desc    Create post for a user
    * @access  Public
    * ***/
    this.app.post("/api/users/:userId/posts", [
      jwtMiddleware.validJWTNeeded,
      apiMiddleware.validatePostBody,
      apiMiddleware.validateUserExist,
      apiController.createPost
    ])

    /***
    * @router  GET: /api/users/:userId/posts
    * @desc    Get all post for a user
    * @access  Public
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/users/:userId/posts`, [
      jwtMiddleware.validJWTNeeded,
      apiMiddleware.validateUserExist,
      apiController.getUserPosts
    ])

    /***
    * @router  GET: /api/users/top-users-with-latest-comments
    * @desc    Get Top users with latest comments
    * @access  Public
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/users/top-users-with-latest-comments`, apiController.getUserWithComments)

    /***
    * @router  POST: /api/posts/:postId/comments
    * @desc    Create post for a comment
    * @access  Public
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/posts/:postId/comments`, [
      jwtMiddleware.validJWTNeeded,
      apiMiddleware.validateCommentsBody,
      apiMiddleware.validatePostExist,
      apiController.createPostComment
    ])

    return this.app;
  }
}
