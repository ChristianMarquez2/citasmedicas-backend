import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  listSpecialtiesController, getSpecialtyController, createSpecialtyController,
  updateSpecialtyController, deleteSpecialtyController
} from "../controllers/specialties.controller.js";

const router = Router();
router.use(authMiddleware);
router.get("/", listSpecialtiesController);
router.get("/:id", getSpecialtyController);
router.post("/", createSpecialtyController);
router.put("/:id", updateSpecialtyController);
router.delete("/:id", deleteSpecialtyController);
export default router;
