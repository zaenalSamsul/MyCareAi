const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token diperlukan" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid" });

    req.user = user; // menyimpan payload token
    next();
  });
};

// exports.isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   return res.status(401).json({ message: "Belum login" });
// };

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Akses khusus admin" });
};
