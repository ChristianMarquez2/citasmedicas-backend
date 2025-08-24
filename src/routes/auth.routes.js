import { Router } from "express";
import { loginController, meController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
router.post("/login", loginController);
router.get("/me", authMiddleware, meController);
export default router;
