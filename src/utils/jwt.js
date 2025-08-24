// src/utils/jwt.js
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signJWT = (payload, opts = { expiresIn: "1h" }) =>
  jwt.sign(payload, env.JWT_SECRET, opts);

export const verifyJWT = (token) => jwt.verify(token, env.JWT_SECRET);
