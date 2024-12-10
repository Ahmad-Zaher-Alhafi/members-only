const express = require("express");
const session = require("express-session");
const router = require("./routes/router");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/clubDB");
const bcrypt = require("bcryptjs");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (us, done) => {
  try {
    const user = db.getUserById(us.id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listenning to https://localhost:${PORT}`);
});
