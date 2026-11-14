import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { signToken } from "../utils/token.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

export const registerUser = async ({ name, email, password }) => {
  const user = await User.create({
    name,
    email: normalizeEmail(email),
    password,
  });

  return { user, token: signToken(user.id) };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: normalizeEmail(email) }).select("+password");
  const isValid = user ? await user.comparePassword(password) : false;

  if (!isValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  return { user, token: signToken(user.id) };
};