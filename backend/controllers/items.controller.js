const Item = require("../models/Item");

// Récupérer tous les items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
