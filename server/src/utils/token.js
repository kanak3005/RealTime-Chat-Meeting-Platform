import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const ALGORITHM = "HS256";

export const signToken = (userId) =>
  jwt.sign({ sub: String(userId) }, env.jwtSecret, {
    algorithm: ALGORITHM,
    expiresIn: `${env.jwtExpiresDays}d`,
  });

export const verifyToken = (token) =>
  jwt.verify(token, env.jwtSecret, { algorithms: [ALGORITHM] });