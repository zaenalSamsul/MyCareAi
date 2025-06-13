const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Semua route di bawah ini perlu token JWT
router.post("/", verifyToken, noteController.createNote);
router.get("/", verifyToken, noteController.getNotes);
router.put("/:id", verifyToken, noteController.updateNote);
router.delete("/:id", verifyToken, noteController.deleteNote);

module.exports = router;
