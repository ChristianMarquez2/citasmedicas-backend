import { comparePassword } from "../utils/password.js";
import { signJWT } from "../utils/jwt.js";
import { findUserByEmail } from "../repositories/user.repo.js";

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Usuario o contraseña incorrectos");
  const ok = await comparePassword(password, user.password);
  if (!ok) throw new Error("Usuario o contraseña incorrectos");

  const token = signJWT({ id: user._id, email: user.email });
  const safe = { id: user._id, nombre: user.nombre, apellido: user.apellido, email: user.email };
  return { token, user: safe };
};
