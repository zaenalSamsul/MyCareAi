const db = require("../models/db");
const { validationResult } = require("express-validator");

exports.getAllArticles = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.query(
    "SELECT * FROM articles ORDER BY published_at DESC LIMIT ? OFFSET ?",
    [limit, offset],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ page, limit, results });
    }
  );
};

exports.getArticleById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM articles WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.json(results[0]);
  });
};

exports.createArticle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, image, url, published_at } = req.body;
  db.query(
    "INSERT INTO articles (title, image, url, published_at) VALUES (?, ?, ?, ?)",
    [title, image, url, published_at],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        message: "Artikel berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

exports.updateArticle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, image, url, published_at } = req.body;

  const fields = [];
  const values = [];

  if (title) {
    fields.push("title = ?");
    values.push(title);
  }
  if (image) {
    fields.push("image = ?");
    values.push(image);
  }
  if (url) {
    fields.push("url = ?");
    values.push(url);
  }
  if (published_at) {
    fields.push("published_at = ?");
    values.push(published_at);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "Tidak ada data untuk diperbarui" });
  }

  values.push(id);

  const sql = `UPDATE articles SET ${fields.join(", ")} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Artikel tidak ditemukan" });

    res.json({ message: "Artikel berhasil diperbarui" });
  });
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM articles WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    res.json({ message: "Artikel berhasil dihapus" });
  });
};
