const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "changemoi";

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  // Le token est envoyé sous la forme "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token invalide" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; // on peut récupérer l'ID du joueur
    next(); // tout est ok, on passe au middleware suivant ou à la route
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

module.exports = verifyToken;
