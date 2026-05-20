import express from "express";
import Session from "../models/session.js";

const router = express.Router();

// Sauvegarder une session
router.post("/", async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// Récupérer les sessions — filtrées par email si fourni
router.get("/", async (req, res) => {
  try {
    const filter = req.query.email ? { email: req.query.email } : {};
    const sessions = await Session.find(filter).sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;