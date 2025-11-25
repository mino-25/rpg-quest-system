const Player = require("../models/Player");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "changemoi"; // à mettre dans .env

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    // Vérifier si le joueur existe déjà
    const existingPlayer = await Player.findOne({ email: req.body.email });
    if (existingPlayer) return res.status(400).json({ message: "Email déjà utilisé" });

    // Création du joueur
    const player = await Player.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      level: 1,
      experience: 0,
      inventory: []
    });

    // Générer un token
    const token = jwt.sign({ id: player._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ player, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const player = await Player.findOne({ email: req.body.email });
    if (!player) return res.status(404).json({ message: "Joueur non trouvé" });

    // Vérification du mot de passe
    const isValid = await bcrypt.compare(req.body.password, player.password);
    if (!isValid) return res.status(401).json({ message: "Mot de passe incorrect" });

    // Générer un token
    const token = jwt.sign({ id: player._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ player, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
