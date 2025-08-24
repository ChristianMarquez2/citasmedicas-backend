import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  listAppointmentsController, getAppointmentController, createAppointmentController,
  updateAppointmentController, deleteAppointmentController
} from "../controllers/appointments.controller.js";

const router = Router();
router.use(authMiddleware);
router.get("/", listAppointmentsController);
router.get("/:id", getAppointmentController);
router.post("/", createAppointmentController);
router.put("/:id", updateAppointmentController);
router.delete("/:id", deleteAppointmentController);
export default router;
