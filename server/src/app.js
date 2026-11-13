import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

export const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      uptime: Math.round(process.uptime()),
      db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    },
  });
});

app.use(notFound);
app.use(errorHandler);