require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("../models/Item");
const Quest = require("../models/Quest");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connexion MongoDB OK");

    // Vider les collections pour recommencer propre
    await Item.deleteMany({});
    await Quest.deleteMany({});

    // Items à insérer
    const items = [
      { name: "Épée de feu", description: "Une épée magique", type: "arme" },
      { name: "Bouclier de glace", description: "Protège contre le froid", type: "bouclier" },
      { name: "Potion de soin", description: "Restaure 50 PV", type: "potion" }
    ];

    // Insérer les items et récupérer leurs IDs
    const createdItems = await Item.insertMany(items);

    // Quests à insérer avec des items en récompense
    const quests = [
      {
        title: "Sauver le village",
        description: "Protège le village des gobelins",
        status: "disponible",
        rewards: {
          experience: 100,
          items: [createdItems[1]._id] // Bouclier de glace
        }
      },
      {
        title: "Trouver l'épée perdue",
        description: "Récupérer l'épée magique dans la forêt",
        status: "disponible",
        rewards: {
          experience: 200,
          items: [createdItems[0]._id, createdItems[2]._id] // Épée de feu + Potion
        }
      }
    ];

    await Quest.insertMany(quests);

    console.log("Seed terminé avec succès !");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
