// src/middleware/cors.js
import cors from "cors";
import { env } from "../config/env.js";
export const corsMiddleware = cors({
  origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN.split(","),
  credentials: true,
});
