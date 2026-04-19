import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import exerciseRoutes from "./routes/exerciseRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/Userroutes.js";
import ressourceRoutes from "./routes/ressourceRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));

// Routes
app.use("/api/exercises", exerciseRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api", userRoutes);
app.use("/api/ressources", ressourceRoutes);

app.get("/", (req, res) => {
  res.send("API CESIZEN OK");
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});