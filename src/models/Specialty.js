import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true, maxlength: 20 },
    nombre: { type: String, required: true, trim: true, maxlength: 20 },
    descripcion: { type: String, trim: true, maxlength: 20 },
  },
  { timestamps: true }
);

specialtySchema.index({ codigo: 1 }, { unique: true });

export const Specialty = mongoose.model("especialidades", specialtySchema);
