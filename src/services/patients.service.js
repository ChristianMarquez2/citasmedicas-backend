import {
  listPatients, countPatients, createPatient, updatePatient,
  deletePatient, findPatientById, findByCedula
} from "../repositories/patient.repo.js";
import { buildPagination } from "../utils/paginator.js";

export const getPatients = async (query) => {
  const { page, limit, skip } = buildPagination(query);
  const filter = {};
  if (query.search) {
    filter.$or = [
      { nombre: new RegExp(query.search, "i") },
      { apellido: new RegExp(query.search, "i") },
      { cedula: new RegExp(query.search, "i") },
    ];
  }
  const [items, total] = await Promise.all([
    listPatients({ skip, limit, filter }), countPatients(filter)
  ]);
  return { items, total, page, limit };
};

export const createPatientSvc = async (data) => {
  const exists = await findByCedula(data.cedula);
  if (exists) {
    const e = new Error("La cédula ya existe");
    e.status = 409;
    throw e;
  }
  return createPatient(data);
};

export const updatePatientSvc = async (id, data) => {
  const p = await findPatientById(id);
  if (!p) { const e = new Error("Paciente no encontrado"); e.status = 404; throw e; }
  if (data.cedula && data.cedula !== p.cedula) {
    const dup = await findByCedula(data.cedula);
    if (dup) { const e = new Error("La cédula ya existe"); e.status = 409; throw e; }
  }
  return updatePatient(id, data);
};

export const deletePatientSvc = async (id) => {
  const out = await deletePatient(id);
  if (!out) { const e = new Error("Paciente no encontrado"); e.status = 404; throw e; }
  return out;
};
