const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["disponible", "en cours", "terminée"], default: "disponible" },
  rewards: {
    experience: { type: Number, default: 0 },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }] // relation avec Items
  }
}, { timestamps: true });

module.exports = mongoose.model("Quest", questSchema, "quests");
