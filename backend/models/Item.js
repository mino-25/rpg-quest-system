const mongoose = require("mongoose");

// On définit le schéma de la collection
const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
},  
  description: { 
    type: String, 
    default: "Une description de l'objet." 
},
    type: { 
    type: String, 
    enum: ["arme", "bouclier", "potion", "armure"],
    required: true
},
    effect: {
        health: { type: Number, default: 0 },
        experience: { type: Number, default: 0 },
        strength: { type: Number, default: 0 }
    }
  
}, { timestamps: true });

// On exporte le modèle pour l'utiliser ailleurs
module.exports = mongoose.model("Item", itemSchema, "items");
