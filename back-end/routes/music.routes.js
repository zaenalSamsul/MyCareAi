const express = require("express");
const router = express.Router();
const music = require("../controllers/music.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

router.post("/", verifyToken, isAdmin, music.addMusic); // Admin only
router.get("/", verifyToken, music.getAllMusic);
router.post("/favorite/:id", verifyToken, music.favoriteMusic);
router.get("/favorites", verifyToken, music.getFavorites);

module.exports = router;
