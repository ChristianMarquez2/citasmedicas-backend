import { z } from "zod";

export const createSpecialtySchema = z.object({
  codigo: z.string().min(1).max(20),
  nombre: z.string().min(1).max(20),
  descripcion: z.string().max(20).optional(),
});

export const updateSpecialtySchema = createSpecialtySchema.partial();
