/* Libraries */
import { Request, Response, NextFunction } from "express";

/* Application Modules */
import { ApiError } from "../exceptions/APIError";
import responseHandler from "../responseHandler";
import { logger } from "../../config/logger";

export function errorHandler(error: ApiError, req: Request, res: Response, next: NextFunction) {
  const statusCode = error.status;

  const resBody = {
    status: false,
    message: error.message,
  }

  logger.error(error.stack);
  return responseHandler.customResponse(statusCode, resBody, res);
}

export const routeNotFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
  responseHandler.customResponse(404, { message: "Route not found" }, res);
  return next();
}
