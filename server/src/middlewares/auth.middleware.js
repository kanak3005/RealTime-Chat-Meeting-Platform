import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/token.js";
import { AUTH_COOKIE_NAME } from "../utils/cookie.js";

export const protect = async (req, _res, next) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token) {
    throw ApiError.unauthorized();
  }

  const { sub } = verifyToken(token);
  const user = await User.findById(sub);

  if (!user) {
    throw ApiError.unauthorized();
  }

  req.user = user;
  next();
};
