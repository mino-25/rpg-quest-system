const express = require("express");
const router = express.Router();
const questsController = require("../controllers/quests.controller");
const verifyToken = require("../middleware/auth");

// GET /quests → protégé par JWT
router.get("/", verifyToken, questsController.getAllQuests);

module.exports = router;
