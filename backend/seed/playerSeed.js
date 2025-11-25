require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Player = require("../models/Player");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connexion MongoDB OK");

    // Supprimer les anciens joueurs
    await Player.deleteMany({});

    // Créer un joueur seed
    const player = await Player.create({
      name: "HérosTest",
      email: "test@example.com",
      password: "MotDePasse123",
      level: 1,
      experience: 0,
      inventory: []
    });

    console.log("Player créé :", player);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
