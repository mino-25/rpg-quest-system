const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const playerRoutes = require("./routes/players.routes");
const itemsRoutes = require("./routes/items.routes");
const questsRoutes = require("./routes/quests.routes");

const app = express();
app.use(express.json());

// ⚡ CORS : autoriser le front Vite
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté "))
  .catch(err => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/player", playerRoutes);
app.use("/items", itemsRoutes);
app.use("/quests", questsRoutes);

app.listen(3000, () => console.log("Serveur lancé sur http://localhost:3000"));
