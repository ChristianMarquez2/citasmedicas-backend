// src/config/env.js
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().optional().default("*"),
  RATE_WINDOW_MS: z.string().optional().default("60000"),
  RATE_MAX: z.string().optional().default("100"),
  LOG_FORMAT: z.string().optional().default("dev"),
});

export const env = envSchema.parse(process.env);
