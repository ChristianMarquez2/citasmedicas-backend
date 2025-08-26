import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true, maxlength: 20 },
    apellido: { type: String, required: true, trim: true, maxlength: 20 },
    cedula: { type: String, required: true, unique: true, trim: true, maxlength: 20 },
    fecha_nacimiento: { type: String, trim: true, maxlength: 20 },
    genero: { type: String, trim: true, maxlength: 20 },
    ciudad: { type: String, trim: true, maxlength: 20 },
    direccion: { type: String, trim: true, maxlength: 20 },
    telefono: { type: String, trim: true, maxlength: 20 },
    email: { type: String, trim: true, maxlength: 30 },
  },
  { timestamps: true }
);

patientSchema.index({ cedula: 1 }, { unique: true });

export const Patient = mongoose.model("pacientes", patientSchema);
