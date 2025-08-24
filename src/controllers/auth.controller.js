import { loginSchema } from "../validations/auth.validation.js";
import { loginService } from "../services/auth.service.js";
import { findUserSafeById } from "../repositories/user.repo.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { token, user } = await loginService(email, password);
    res.json({ message: "Login exitoso", token, user });
  } catch {
    res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }
};

export const meController = async (req, res) => {
  try {
    const user = await findUserSafeById(req.user.id);
    res.json({ user, modules: ["Pacientes", "Especialidades", "Citas"] });
  } catch {
    res.status(500).json({ error: "No se pudo obtener el usuario" });
  }
};
