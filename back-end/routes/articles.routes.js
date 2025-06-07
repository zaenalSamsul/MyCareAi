const express = require("express");
const router = express.Router();
const { body, validationResult, query } = require("express-validator");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const articlesController = require("../controllers/articles.controller");

// Ambil semua artikel
router.get(
  "/",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page harus angka >= 1"),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit harus angka >= 1"),
  ],
  articlesController.getAllArticles
);

// Ambil satu artikel by ID
router.get("/:id", articlesController.getArticleById);

// Tambah artikel (admin only)
router.post(
  "/",
  verifyToken,
  isAdmin,
  [
    body("title").notEmpty().withMessage("Judul wajib diisi"),
    body("image").isURL().withMessage("URL gambar tidak valid"),
    body("url").isURL().withMessage("URL artikel tidak valid"),
    body("published_at")
      .isDate()
      .withMessage("Tanggal tidak valid (YYYY-MM-DD)"),
  ],
  articlesController.createArticle
);

// Update artikel (admin only)
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  [
    body("title").optional().notEmpty().withMessage("Judul tidak boleh kosong"),
    body("image").optional().isURL().withMessage("URL gambar tidak valid"),
    body("url").optional().isURL().withMessage("URL artikel tidak valid"),
    body("published_at").optional().isDate().withMessage("Tanggal tidak valid"),
  ],
  articlesController.updateArticle
);

// Hapus artikel (admin only)
router.delete("/:id", verifyToken, isAdmin, articlesController.deleteArticle);

module.exports = router;
