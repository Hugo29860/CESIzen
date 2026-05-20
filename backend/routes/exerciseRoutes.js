import express from "express";
import Exercise from "../models/Exercise.js";
const router = express.Router();

// Récupérer tous les exercices
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Ajouter un exercice
router.post("/", async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Modifier un exercice
router.put("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!exercise) return res.status(404).json({ message: "Exercice introuvable." });
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Supprimer un exercice
router.delete("/:id", async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: "Exercice supprimé." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;