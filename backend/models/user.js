import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  prenom:   { type: String, required: true },
  nom:      { type: String, required: true },
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["visiteur", "compte", "admin"], default: "compte" },
  actif:    { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);