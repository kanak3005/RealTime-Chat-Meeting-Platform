import { env } from "../config/env.js";
import ApiError from "../utils/ApiError.js";

const IS_PRODUCTION = env.nodeEnv === "production";

export function notFound(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

function toApiError(error) {
  if (error instanceof ApiError) return error;

  if (error.name === "ValidationError") {
    const details = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));
    return ApiError.badRequest(details[0].message, details);
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern ?? {})[0] ?? "value";
    return ApiError.conflict(`This ${field} is already in use`);
  }

  if (error.name === "CastError") {
    return ApiError.badRequest(`Invalid ${error.path}`);
  }

  if (error.name === "TokenExpiredError") {
    return ApiError.unauthorized(
      "Your session has expired. Please log in again."
    );
  }

  if (error.name === "JsonWebTokenError") {
    return ApiError.unauthorized("Invalid session. Please log in again.");
  }

  if (error.type === "entity.parse.failed") {
    return ApiError.badRequest("Request body is not valid JSON");
  }

  return null;
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  const known = toApiError(error);

  if (!known) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: IS_PRODUCTION ? "Something went wrong on the server" : error.message,
      ...(!IS_PRODUCTION && { stack: error.stack }),
    });
  }

  return res.status(known.statusCode).json({
    success: false,
    message: known.message,
    ...(known.details && { errors: known.details }),
  });
}