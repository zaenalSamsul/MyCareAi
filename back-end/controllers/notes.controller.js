const db = require("../models/db");

// Daftar mood yang valid
const validMoods = ["happy", "sad", "neutral", "anxious", "burnout"];

// Create note
exports.createNote = (req, res) => {
  const { note, mood } = req.body;
  const userId = req.user.id;

  if (!validMoods.includes(mood)) {
    return res.status(400).send({ message: "Mood tidak valid" });
  }

  const sql = "INSERT INTO daily_notes (user_id, note, mood) VALUES (?, ?, ?)";
  db.query(sql, [userId, note, mood], (err, result) => {
    if (err) return res.status(500).send("Gagal menyimpan catatan");
    res.send({ message: "Catatan ditambahkan", id: result.insertId });
  });
};

// Get all notes for user
exports.getNotes = (req, res) => {
  const userId = req.user.id;
  const sql =
    "SELECT * FROM daily_notes WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send("Gagal mengambil catatan");
    res.json(results);
  });
};

// Update note
exports.updateNote = (req, res) => {
  const userId = req.user.id;
  const noteId = req.params.id;
  const { note, mood } = req.body;

  if (!validMoods.includes(mood)) {
    return res.status(400).send({ message: "Mood tidak valid" });
  }

  const sql =
    "UPDATE daily_notes SET note = ?, mood = ? WHERE id = ? AND user_id = ?";
  db.query(sql, [note, mood, noteId, userId], (err, result) => {
    if (err) return res.status(500).send("Gagal mengupdate catatan");
    res.send({ message: "Catatan diupdate" });
  });
};

// Delete note
exports.deleteNote = (req, res) => {
  const userId = req.user.id;
  const noteId = req.params.id;

  const sql = "DELETE FROM daily_notes WHERE id = ? AND user_id = ?";
  db.query(sql, [noteId, userId], (err, result) => {
    if (err) return res.status(500).send("Gagal menghapus catatan");
    res.send({ message: "Catatan dihapus" });
  });
};
