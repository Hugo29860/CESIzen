import mongoose from "mongoose";

const RessourceSchema = new mongoose.Schema({
  titre:      { type: String, required: true },
  contenu:    { type: String, required: true },
  categorie:  { type: String, enum: ["stress", "anxiete", "sommeil", "respiration", "autre"], default: "autre" },
  auteur:     { type: String, default: "Équipe CESIZen" },
}, { timestamps: true });

export default mongoose.model("Ressource", RessourceSchema);