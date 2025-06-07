const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models/db");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    done(err, results[0]);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const providerUserId = profile.id;

      // Check if user already exists
      db.query(
        "SELECT * FROM oauth_accounts WHERE provider_user_id = ?",
        [providerUserId],
        (err, results) => {
          if (results.length > 0) {
            db.query(
              "SELECT * FROM users WHERE id = ?",
              [results[0].user_id],
              (err, users) => {
                return done(null, users[0]);
              }
            );
          } else {
            // New user: insert to users and oauth_accounts
            db.query(
              "INSERT INTO users (name, email, profile_picture, role) VALUES (?, ?, ?)",
              [profile.displayName, email, profile.photos[0].value, "user"],
              (err, result) => {
                const userId = result.insertId;
                db.query(
                  "INSERT INTO oauth_accounts (user_id, provider, provider_user_id, access_token, refresh_token) VALUES (?, ?, ?, ?, ?)",
                  [userId, "google", providerUserId, accessToken, refreshToken],
                  (err) => {
                    db.query(
                      "SELECT * FROM users WHERE id = ?",
                      [userId],
                      (err, users) => {
                        return done(null, users[0]);
                      }
                    );
                  }
                );
              }
            );
          }
        }
      );
    }
  )
);
