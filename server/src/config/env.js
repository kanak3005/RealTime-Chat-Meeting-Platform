import dotenv from "dotenv";
import { fileURLToPath } from "node:url";//fileURLToPath() converts that URL into a normal file path.
import path from "node:path";

const currentFile = fileURLToPath(import.meta.url);//import.meta.url gives the URL of the current file.
const currentDir = path.dirname(currentFile);//path.dirname() extracts the directory of that file.
//Current file: server/src/config/env.js
// currentDir: server/src/config

dotenv.config({//This tells dotenv where your .env file is located.
  path: path.resolve(currentDir, "../../../.env"), //From config, we go three levels backwards to find .env. that's why we use ../../../.env
});

const REQUIRED = ["MONGODB_URI", "JWT_SECRET"];
 const missing = REQUIRED.filter((key) => !process.env[key]);//filter() checks which required variables are missing.

if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missing.join(", ")}`
  );
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long");
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresDays: Number(process.env.JWT_EXPIRES_DAYS) || 7,
};

export default env;