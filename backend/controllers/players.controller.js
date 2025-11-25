const Player = require("../models/Player");
const Quest = require("../models/Quest");
const Item = require("../models/Item");

// GET /api/player/profile
exports.getProfile = async (req, res) => {
  try {
    const player = await Player.findById(req.userId)
      .populate("inventory"); // <-- important
    if (!player) return res.status(404).json({ message: "Joueur non trouvé" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/player/accept-quest/:questId
exports.acceptQuest = async (req, res) => {
  try {
    const questId = req.params.questId;

    // Vérifier quête
    const quest = await Quest.findById(questId);
    if (!quest) return res.status(404).json({ message: "Quête introuvable" });

    // Déjà en cours ?
    if (quest.status === "en cours") {
      return res.status(400).json({ message: "Cette quête est déjà en cours." });
    }

    // Mettre à jour le statut
    quest.status = "en cours";
    await quest.save();

    res.json({ message: "Quête acceptée !", quest });

  } catch (err) {
    console.error("ERREUR DANS acceptQuest :", err);
    res.status(500).json({ error: err.message });
  }
};




// POST /api/player/use-item/:itemId
exports.useItem = async (req, res) => {
  try {
    const player = await Player.findById(req.userId);
    if (!player) return res.status(404).json({ message: "Joueur non trouvé" });

    const itemIndex = player.inventory.indexOf(req.params.itemId);
    if (itemIndex === -1) return res.status(400).json({ message: "Item non trouvé dans l'inventaire" });

    // Retirer l'item de l'inventaire
    player.inventory.splice(itemIndex, 1);
    await player.save();

    res.json({ message: "Item utilisé", inventory: player.inventory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/player/finish-quest/:questId
exports.finishQuest = async (req, res) => {
  try {
    const playerId = req.userId;
    const questId = req.params.questId;

    // Récupérer joueur et quête
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: "Joueur introuvable" });

    const quest = await Quest.findById(questId);
    if (!quest) return res.status(404).json({ message: "Quête introuvable" });

    // Vérifier que la quête est en cours
    if (quest.status !== "en cours") {
      return res.status(400).json({ message: "La quête n'est pas en cours" });
    }

    // Ajouter les items de récompense dans l’inventaire
    if (quest.rewards.items && quest.rewards.items.length > 0) {
      player.inventory = player.inventory.concat(quest.rewards.items);
      await player.save();
    }

    if (quest.rewards.experience) {
      player.experience += quest.rewards.experience;
      await player.save();
    }

    if (player.experience >= player.level * 100) {
      player.level += 1;
      player.experience = 0;
      await player.save();
    }

    // Mettre à jour le statut de la quête
    quest.status = "terminée";
    await quest.save();

    res.json({ message: "Quête terminée !", quest });

  } catch (err) {
    console.error("ERREUR finishQuest :", err);
    res.status(500).json({ error: err.message });
  }
};

