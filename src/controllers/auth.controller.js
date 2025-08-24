import { loginSchema } from "../validations/auth.validation.js";
import { loginService } from "../services/auth.service.js";
import { findUserSafeById } from "../repositories/user.repo.js";
import { User } from "../models/User.js";
import { hashPassword } from "../utils/password.js";
import { generateJWT } from "../utils/jwt.js";



export const registerController = async (req, res, next) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    // revisa si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Usuario ya existe" });

    const hashed = await hashPassword(password);

    const user = new User({ nombre, apellido, email, password: hashed });
    await user.save();

    const token = generateJWT({ id: user._id, email: user.email });

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};
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
