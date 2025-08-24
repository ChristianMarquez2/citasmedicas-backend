// src/utils/password.js
import bcrypt from "bcryptjs";

// Para hashear una contraseña
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Para comparar contraseña con hash
export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
