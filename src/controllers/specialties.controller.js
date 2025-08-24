import { createSpecialtySchema, updateSpecialtySchema } from "../validations/specialties.validation.js";
import { findSpecialtyById } from "../repositories/specialty.repo.js";
import { getSpecialties, createSpecialtySvc, updateSpecialtySvc, deleteSpecialtySvc } from "../services/specialties.service.js";

export const listSpecialtiesController = async (req, res, next) => {
  try { res.json(await getSpecialties(req.query)); } catch (e) { next(e); }
};
export const getSpecialtyController = async (req, res, next) => {
  try {
    const s = await findSpecialtyById(req.params.id);
    if (!s) return res.status(404).json({ error: "Especialidad no encontrada" });
    res.json(s);
  } catch (e) { next(e); }
};
export const createSpecialtyController = async (req, res, next) => {
  try { res.status(201).json(await createSpecialtySvc(createSpecialtySchema.parse(req.body))); }
  catch (e) { next(e); }
};
export const updateSpecialtyController = async (req, res, next) => {
  try { res.json(await updateSpecialtySvc(req.params.id, updateSpecialtySchema.parse(req.body))); }
  catch (e) { next(e); }
};
export const deleteSpecialtyController = async (req, res, next) => {
  try { res.json(await deleteSpecialtySvc(req.params.id)); }
  catch (e) { next(e); }
};
