import {
  listSpecialties, countSpecialties, createSpecialty,
  updateSpecialty, deleteSpecialty, findSpecialtyById, findByCodigo
} from "../repositories/specialty.repo.js";
import { buildPagination } from "../utils/paginator.js";

export const getSpecialties = async (query) => {
  const { page, limit, skip } = buildPagination(query);
  const filter = {};
  if (query.search) filter.$or = [
    { codigo: new RegExp(query.search, "i") },
    { nombre: new RegExp(query.search, "i") },
  ];
  const [items, total] = await Promise.all([
    listSpecialties({ skip, limit, filter }), countSpecialties(filter)
  ]);
  return { items, total, page, limit };
};

export const createSpecialtySvc = async (data) => {
  const exists = await findByCodigo(data.codigo);
  if (exists) { const e = new Error("La especialidad (código) ya existe"); e.status = 409; throw e; }
  return createSpecialty(data);
};

export const updateSpecialtySvc = async (id, data) => {
  const s = await findSpecialtyById(id);
  if (!s) { const e = new Error("Especialidad no encontrada"); e.status = 404; throw e; }
  if (data.codigo && data.codigo !== s.codigo) {
    const dup = await findByCodigo(data.codigo);
    if (dup) { const e = new Error("La especialidad (código) ya existe"); e.status = 409; throw e; }
  }
  return updateSpecialty(id, data);
};

export const deleteSpecialtySvc = async (id) => {
  const out = await deleteSpecialty(id);
  if (!out) { const e = new Error("Especialidad no encontrada"); e.status = 404; throw e; }
  return out;
};
