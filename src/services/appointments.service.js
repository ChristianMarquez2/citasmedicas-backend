import {
  listAppointments, countAppointments, createAppointment,
  updateAppointment, deleteAppointment, findAppointmentById,
  findByPacienteAndFecha, findByEspecialidadAndFecha
} from "../repositories/appointment.repo.js";
import { buildPagination } from "../utils/paginator.js";

export const getAppointments = async (query) => {
  const { page, limit, skip } = buildPagination(query);
  const filter = {};
  if (query.id_paciente) filter.id_paciente = query.id_paciente;
  if (query.id_especialidad) filter.id_especialidad = query.id_especialidad;
  const [items, total] = await Promise.all([
    listAppointments({ skip, limit, filter }), countAppointments(filter)
  ]);
  return { items, total, page, limit };
};

export const createAppointmentSvc = async (data) => {
  const fecha = new Date(data.fecha);
  // Conflicto por paciente o especialidad en la misma fecha/hora
  const pHit = await findByPacienteAndFecha(data.id_paciente, fecha);
  if (pHit) { const e = new Error("Paciente ya tiene cita en esa fecha"); e.status = 409; throw e; }
  const sHit = await findByEspecialidadAndFecha(data.id_especialidad, fecha);
  if (sHit) { const e = new Error("Especialidad ocupada en esa fecha"); e.status = 409; throw e; }
  return createAppointment({ ...data, fecha });
};

export const updateAppointmentSvc = async (id, data) => {
  const ap = await findAppointmentById(id);
  if (!ap) { const e = new Error("Cita no encontrada"); e.status = 404; throw e; }
  const merged = { ...ap.toObject(), ...data };
  if (data.fecha) {
    const fecha = new Date(data.fecha);
    const pHit = await findByPacienteAndFecha(merged.id_paciente, fecha);
    if (pHit && pHit._id.toString() !== id) { const e = new Error("Paciente ya tiene cita en esa fecha"); e.status = 409; throw e; }
    const sHit = await findByEspecialidadAndFecha(merged.id_especialidad, fecha);
    if (sHit && sHit._id.toString() !== id) { const e = new Error("Especialidad ocupada en esa fecha"); e.status = 409; throw e; }
    merged.fecha = fecha;
  }
  return updateAppointment(id, merged);
};

export const deleteAppointmentSvc = async (id) => {
  const out = await deleteAppointment(id);
  if (!out) { const e = new Error("Cita no encontrada"); e.status = 404; throw e; }
  return out;
};
