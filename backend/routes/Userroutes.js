import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ── REGISTER ──
router.post("/register", async (req, res) => {
  try {
    const { prenom, nom, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ prenom, nom, email, password: hashed });
    await user.save();

    res.status(201).json({
      message: "Compte créé avec succès.",
      user: { prenom, nom, email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// ── LOGIN ──
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    if (!user.actif) {
      return res.status(403).json({ message: "Compte désactivé." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    //  Génère le token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Connexion réussie.",
      token,   //  envoyé au frontend
      user: { prenom: user.prenom, nom: user.nom, email: user.email, role: user.role },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;