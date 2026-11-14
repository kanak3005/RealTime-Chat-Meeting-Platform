import * as authService from "../services/auth.service.js";
import { sendSuccess } from "../utils/response.js";
import { setAuthCookie, clearAuthCookie } from "../utils/cookie.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.registerUser({ name, email, password });

  setAuthCookie(res, token);
  sendSuccess(res, { user }, 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser({ email, password });

  setAuthCookie(res, token);
  sendSuccess(res, { user });
};

export const logout = async (_req, res) => {
  clearAuthCookie(res);
  sendSuccess(res);
};

export const me = async (req, res) => {
  sendSuccess(res, { user: req.user });
};