import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";
import { Specialty } from "../src/models/Specialty.js";

const run = async () => {
  await connectDB();
  const data = [
    { codigo: "GEN-001", nombre: "Medicina General", descripcion: "Primaria" },
    { codigo: "PED-001", nombre: "Pediatria", descripcion: "Niños" },
    { codigo: "CAR-001", nombre: "Cardiologia", descripcion: "Corazón" },
  ];
  for (const s of data) {
    await Specialty.updateOne({ codigo: s.codigo }, s, { upsert: true });
  }
  console.log("✅ seedSpecialties listo");
  await mongoose.disconnect();
};

run().catch((e) => { console.error(e); process.exit(1); });
