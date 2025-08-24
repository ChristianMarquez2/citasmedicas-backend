// src/utils/password.js
import bcrypt from "bcryptjs";
export const hash = (plain) => bcrypt.hash(plain, 10);
export const compare = (plain, hashed) => bcrypt.compare(plain, hashed);
