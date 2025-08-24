// src/utils/jwt.js
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// Export genérico llamado generateJWT (para controladores que lo usen)
export const generateJWT = (payload, opts = { expiresIn: "24h" }) =>
  jwt.sign(payload, env.JWT_SECRET, opts);

// Export alternativo llamado signJWT (para servicios u otros archivos)
export const signJWT = generateJWT; // alias, así todos los imports funcionan

export const verifyJWT = (token) => jwt.verify(token, env.JWT_SECRET);
