const express = require("express");
const session = require("express-session");
const passport = require("passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");
const musicRoutes = require("./routes/music.routes");
const articlesRoutes = require("./routes/articles.routes");
require("dotenv").config();
require("./config/passport");

const app = express();

// Middleware security
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // max 100 requests per IP
  message: "Terlalu banyak permintaan dari IP ini, coba lagi nanti.",
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: process.env.JWT_SECRET, // Ganti ini kalau mau session secret terpisah
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key", // simpan di .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true kalau pakai HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/music", musicRoutes);
app.use("/articles", articlesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
