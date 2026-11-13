import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Express error middleware ko 4 arguments chahiye, warna use error handler nahi maanta.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) console.error(err);

  const message =
    statusCode === 500 && env.nodeEnv === "production"
      ? "Something went wrong"
      : err.message;

  res.status(statusCode).json({ success: false, message });
}