import { z } from "zod";

export const createPatientSchema = z.object({
  nombre: z.string().min(1).max(20),
  apellido: z.string().min(1).max(20),
  cedula: z.string().min(5).max(20),
  fecha_nacimiento: z.string().max(20).optional(),
  genero: z.string().max(20).optional(),
  ciudad: z.string().max(20).optional(),
  direccion: z.string().max(20).optional(),
  telefono: z.string().max(20).optional(),
  email: z.string().max(20).optional(),
});

export const updatePatientSchema = createPatientSchema.partial();
