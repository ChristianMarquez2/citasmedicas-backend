import { z } from "zod";

export const createAppointmentSchema = z.object({
  codigo: z.number().int(),
  descripcion: z.number().int(),
  id_paciente: z.string().min(1),
  id_especialidad: z.string().min(1),
  fecha: z.string().datetime().or(z.string().min(1)), // permitimos ISO o string; luego parseamos a Date
});

export const updateAppointmentSchema = createAppointmentSchema.partial();
