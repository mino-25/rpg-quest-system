const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players.controller");
const verifyToken = require("../middleware/auth");

// GET /api/player/profile
router.get("/profile", verifyToken, playersController.getProfile);

// POST /api/player/accept-quest/:questId
router.post("/accept-quest/:questId", verifyToken, playersController.acceptQuest);

// POST /api/player/use-item/:itemId
router.post("/use-item/:itemId", verifyToken, playersController.useItem);

// POST /api/player/finish-quest/:questId
router.post("/finish-quest/:questId", verifyToken, playersController.finishQuest);


module.exports = router;
