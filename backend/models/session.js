// models/Session.js
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  duree:        { type: String },
  cycles:       { type: Number },
  respirations: { type: Number },
  inspire:      { type: Number },
  hold:         { type: Number },
  expire:       { type: Number },
  pause:        { type: Number },
  date:         { type: Date, default: Date.now },
});

export default mongoose.model("Session", SessionSchema);