// src/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
export const rateLimiter = rateLimit({
  windowMs: parseInt(env.RATE_WINDOW_MS),
  max: parseInt(env.RATE_MAX),
  standardHeaders: true,
  legacyHeaders: false,
});
