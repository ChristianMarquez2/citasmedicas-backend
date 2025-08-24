import { z } from "zod";

export const createAppointmentSchema = z.object({
  codigo: z.number().int(),
  descripcion: z.string(),
  id_paciente: z.string().min(1),
  id_especialidad: z.string().min(1),
  fecha: z.string(),    // permitimos ISO o string; luego parseamos a Date
});

export const updateAppointmentSchema = createAppointmentSchema.partial();
