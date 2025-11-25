const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");
const verifyToken = require("../middleware/auth");


router.get("/", verifyToken, itemsController.getAllItems);

module.exports = router;

