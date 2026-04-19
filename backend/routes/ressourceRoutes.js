import express from "express";
import Ressource from "../models/Ressources.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Récupérer toutes les ressources (public)
router.get("/", async (req, res) => {
  try {
    const ressources = await Ressource.find().sort({ createdAt: -1 });
    res.json(ressources);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Ajouter (admin uniquement)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const ressource = new Ressource(req.body);
    await ressource.save();
    res.status(201).json(ressource);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Modifier (admin uniquement)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const ressource = await Ressource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!ressource) return res.status(404).json({ message: "Ressource introuvable." });
    res.json(ressource);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Supprimer (admin uniquement)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Ressource.findByIdAndDelete(req.params.id);
    res.json({ message: "Ressource supprimée." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;