import { env } from "../config/env.js";

export const AUTH_COOKIE_NAME = "meetsphere_token";

const MAX_AGE_MS = Number(env.jwtExpiresDays) * 24 * 60 * 60 * 1000;

const baseOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax",
  path: "/",
};

export const setAuthCookie = (res, token) => {
  res.cookie(AUTH_COOKIE_NAME, token, { ...baseOptions, maxAge: MAX_AGE_MS });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(AUTH_COOKIE_NAME, baseOptions);
};