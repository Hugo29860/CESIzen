// backend/models/Exercise.js
import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  duration:    { type: Number },
  inspire:     { type: Number, default: 4 },
  hold:        { type: Number, default: 0 },
  expire:      { type: Number, default: 4 },
  pause:       { type: Number, default: 0 },
});

export default mongoose.model("Exercise", exerciseSchema);