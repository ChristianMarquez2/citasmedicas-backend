import { Router } from "express";
import authRoutes from "./auth.routes.js";
import patientsRoutes from "./patients.routes.js";
import specialtiesRoutes from "./specialties.routes.js";
import appointmentsRoutes from "./appointments.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/patients", patientsRoutes);
router.use("/specialties", specialtiesRoutes);
router.use("/appointments", appointmentsRoutes);
export default router;
