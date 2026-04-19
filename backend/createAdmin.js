import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

await mongoose.connect("mongodb://127.0.0.1:27017/cesizen");

const existing = await User.findOne({ email: "ton@email.fr" });
if (existing) {
  console.log("Admin déjà existant.");
} else {
  const hashed = await bcrypt.hash("TonMotDePasse", 10);
  await User.create({
    prenom: "Ton Prénom",
    nom: "Ton Nom",
    email: "ton@email.fr",
    password: hashed,
    role: "admin",
    actif: true,
  });
  console.log("✅ Admin créé !");
}

await mongoose.disconnect();