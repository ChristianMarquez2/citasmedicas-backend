import mongoose from "mongoose";
import { connectDB } from "../src/config/db.js";
import { User } from "../src/models/User.js";
import bcrypt from "bcryptjs";

const run = async () => {
  await connectDB();
  const adminPass = await bcrypt.hash("Admin123*", 10);
  const userPass = await bcrypt.hash("User123*", 10);

  const data = [
    { nombre: "Admin", apellido: "CM", email: "admin@cm.com", password: adminPass },
    { nombre: "Usuario", apellido: "CM", email: "user@cm.com", password: userPass },
  ];
  for (const u of data) {
    await User.updateOne({ email: u.email }, u, { upsert: true });
  }
  console.log("✅ seedUsers listo");
  await mongoose.disconnect();
};

run().catch((e) => { console.error(e); process.exit(1); });
