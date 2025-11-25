const Quest = require("../models/Quest");

// Récupérer toutes les quêtes
exports.getAllQuests = async (req, res) => {
  try {
    const available = await Quest.find({ status: "disponible" });
    const inProgress = await Quest.find({ status: "en cours" });
    const finished = await Quest.find({ status: "terminée" });

    res.json({
      available,
      inProgress,
      finished
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


