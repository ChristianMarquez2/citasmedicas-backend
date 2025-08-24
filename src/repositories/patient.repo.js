import { Patient } from "../models/Patient.js";

export const listPatients = ({ skip, limit, filter = {} }) =>
  Patient.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });

export const countPatients = (filter = {}) => Patient.countDocuments(filter);
export const findPatientById = (id) => Patient.findById(id);
export const createPatient = (data) => Patient.create(data);
export const updatePatient = (id, data) => Patient.findByIdAndUpdate(id, data, { new: true });
export const deletePatient = (id) => Patient.findByIdAndDelete(id);
export const findByCedula = (cedula) => Patient.findOne({ cedula });
