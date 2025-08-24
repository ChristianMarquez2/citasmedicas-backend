import { createPatientSchema, updatePatientSchema } from "../validations/patients.validation.js";
import { findPatientById } from "../repositories/patient.repo.js";
import { getPatients, createPatientSvc, updatePatientSvc, deletePatientSvc } from "../services/patients.service.js";

export const listPatientsController = async (req, res, next) => {
  try { res.json(await getPatients(req.query)); } catch (e) { next(e); }
};
export const getPatientController = async (req, res, next) => {
  try {
    const p = await findPatientById(req.params.id);
    if (!p) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(p);
  } catch (e) { next(e); }
};
export const createPatientController = async (req, res, next) => {
  try { res.status(201).json(await createPatientSvc(createPatientSchema.parse(req.body))); }
  catch (e) { next(e); }
};
export const updatePatientController = async (req, res, next) => {
  try { res.json(await updatePatientSvc(req.params.id, updatePatientSchema.parse(req.body))); }
  catch (e) { next(e); }
};
export const deletePatientController = async (req, res, next) => {
  try { res.json(await deletePatientSvc(req.params.id)); }
  catch (e) { next(e); }
};
