import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    codigo: { type: Number, required: true },       // int(11) ~ Number
    descripcion: { type: String, required: true },  // int(11) ~ Number (sí, pediste número)
    id_paciente: { type: mongoose.Schema.Types.ObjectId, ref: "pacientes", required: true },
    id_especialidad: { type: mongoose.Schema.Types.ObjectId, ref: "especialidades", required: true },
    fecha: { type: Date, required: true },
  },
  { timestamps: true }
);

// Ayuda a validar solapamientos por paciente o especialidad en una fecha exacta
appointmentSchema.index({ id_paciente: 1, fecha: 1 }, { unique: true });
appointmentSchema.index({ id_especialidad: 1, fecha: 1 });

export const Appointment = mongoose.model("citas", appointmentSchema);
