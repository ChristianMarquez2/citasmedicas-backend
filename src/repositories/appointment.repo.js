import { Appointment } from "../models/Appointment.js";

export const listAppointments = ({ skip, limit, filter = {} }) =>
  Appointment.find(filter)
    .populate("id_paciente")
    .populate("id_especialidad")
    .skip(skip)
    .limit(limit)
    .sort({ fecha: -1 });

export const countAppointments = (filter = {}) => Appointment.countDocuments(filter);
export const findAppointmentById = (id) => Appointment.findById(id)
  .populate("id_paciente")
  .populate("id_especialidad");

export const createAppointment = (data) => Appointment.create(data);
export const updateAppointment = (id, data) => Appointment.findByIdAndUpdate(id, data, { new: true });
export const deleteAppointment = (id) => Appointment.findByIdAndDelete(id);
export const findByPacienteAndFecha = (id_paciente, fecha) => Appointment.findOne({ id_paciente, fecha });
export const findByEspecialidadAndFecha = (id_especialidad, fecha) => Appointment.findOne({ id_especialidad, fecha });
