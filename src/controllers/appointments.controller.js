import { createAppointmentSchema, updateAppointmentSchema } from "../validations/appointments.validation.js";
import { getAppointments, createAppointmentSvc, updateAppointmentSvc, deleteAppointmentSvc } from "../services/appointments.service.js";
import { findAppointmentById } from "../repositories/appointment.repo.js";

export const listAppointmentsController = async (req, res, next) => {
  try { res.json(await getAppointments(req.query)); } catch (e) { next(e); }
};
export const getAppointmentController = async (req, res, next) => {
  try {
    const a = await findAppointmentById(req.params.id);
    if (!a) return res.status(404).json({ error: "Cita no encontrada" });
    res.json(a);
  } catch (e) { next(e); }
};
export const createAppointmentController = async (req, res, next) => {
  try { 
    console.log("Body recibido:", req.body); // Para debugging
    const validatedData = createAppointmentSchema.parse(req.body);
    const result = await createAppointmentSvc(validatedData);
    res.status(201).json(result);
  }
  catch (e) { 
    console.error("Error en createAppointmentController:", e);
    next(e); 
  }
};
export const updateAppointmentController = async (req, res, next) => {
  try { res.json(await updateAppointmentSvc(req.params.id, updateAppointmentSchema.parse(req.body))); }
  catch (e) { next(e); }
};
export const deleteAppointmentController = async (req, res, next) => {
  try { res.json(await deleteAppointmentSvc(req.params.id)); }
  catch (e) { next(e); }
};
