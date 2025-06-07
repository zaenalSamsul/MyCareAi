const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../controllers/auth.controller");
const { body } = require("express-validator");
const { verifyToken } = require("../middleware/auth.middleware");

// Email/password
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name wajib diisi"),
    body("email").isEmail().withMessage("Format email salah"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter"),
  ],
  auth.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Format email salah"),
    body("password").notEmpty().withMessage("Password wajib diisi"),
  ],
  auth.login
);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Kirim token dan data user sebagai JSON
    res.json({
      token,
      user: req.user,
    });
  }
);

router.get("/success", verifyToken, (req, res) => {
  res.send(req.user);
});

// Logout session-based (Google)
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("❌ Error logout:", err);
      return res.status(500).send({ message: "Logout gagal" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("❌ Error destroy session:", err);
        return res.status(500).send({ message: "Gagal hapus session" });
      }

      res.clearCookie("connect.sid", { path: "/" }); // tambahkan path!
      console.log("✅ Logout berhasil, session & cookie dibersihkan");
      return res
        .status(200)
        .send({ message: "Logout berhasil (Google session)" });
    });
  });
});

// Logout JWT-based (optional, hanya bantu frontend)
router.post("/logout", (req, res) => {
  res.send({ message: "Logout berhasil (JWT)" });
});

module.exports = router;
