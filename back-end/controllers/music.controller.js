const db = require("../models/db");

// Admin-only: tambah musik
exports.addMusic = (req, res) => {
  const { title, artist, url } = req.body;
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Hanya admin yang boleh menambah musik" });
  }

  const sql = "INSERT INTO music_tracks (title, artist, url) VALUES (?, ?, ?)";
  db.query(sql, [title, artist, url], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Gagal menambahkan musik" });
    res.json({ message: "Musik ditambahkan", id: result.insertId });
  });
};

// Semua user: get semua musik
exports.getAllMusic = (req, res) => {
  db.query("SELECT * FROM music_tracks", (err, results) => {
    if (err)
      return res.status(500).json({ message: "Gagal mengambil data musik" });
    res.json(results);
  });
};

// Simpan musik favorit
exports.favoriteMusic = (req, res) => {
  const userId = req.user.id;
  const musicId = req.params.id;

  const sql = "INSERT INTO music_favorites (user_id, music_id) VALUES (?, ?)";
  db.query(sql, [userId, musicId], (err) => {
    if (err)
      return res.status(500).json({ message: "Gagal menyimpan musik favorit" });
    res.json({ message: "Musik ditandai sebagai favorit" });
  });
};

// Lihat musik favorit user
exports.getFavorites = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT m.* FROM music_tracks m
    JOIN music_favorites f ON m.id = f.music_id
    WHERE f.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Gagal mengambil favorit" });
    res.json(results);
  });
};
