import { Specialty } from "../models/Specialty.js";

export const listSpecialties = ({ skip, limit, filter = {} }) =>
  Specialty.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });

export const countSpecialties = (filter = {}) => Specialty.countDocuments(filter);
export const findSpecialtyById = (id) => Specialty.findById(id);
export const createSpecialty = (data) => Specialty.create(data);
export const updateSpecialty = (id, data) => Specialty.findByIdAndUpdate(id, data, { new: true });
export const deleteSpecialty = (id) => Specialty.findByIdAndDelete(id);
export const findByCodigo = (codigo) => Specialty.findOne({ codigo });
