import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";
import { Patient } from "../src/models/Patient.js";

const run = async () => {
  await connectDB();
  const data = [
    {
      nombre: "Cristhian", apellido: "Marquez", cedula: "1751486364",
      fecha_nacimiento: "1999-01-01", genero: "M", ciudad: "Quito",
      direccion: "El Condado", telefono: "099000111", email: "cristhian@example.com"
    },
    {
      nombre: "Ana", apellido: "Perez", cedula: "1101112223",
      fecha_nacimiento: "2000-02-02", genero: "F", ciudad: "Quito",
      direccion: "Norte", telefono: "098222333", email: "ana@example.com"
    },
  ];
  for (const p of data) {
    await Patient.updateOne({ cedula: p.cedula }, p, { upsert: true });
  }
  console.log("✅ seedPatients listo");
  await mongoose.disconnect();
};

run().catch((e) => { console.error(e); process.exit(1); });
