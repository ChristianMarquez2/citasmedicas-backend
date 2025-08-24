import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  listPatientsController, getPatientController, createPatientController,
  updatePatientController, deletePatientController
} from "../controllers/patients.controller.js";

const router = Router();
router.use(authMiddleware);
router.get("/", listPatientsController);
router.get("/:id", getPatientController);
router.post("/", createPatientController);
router.put("/:id", updatePatientController);
router.delete("/:id", deletePatientController);
export default router;
