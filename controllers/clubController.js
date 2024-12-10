const db = require("../db/clubDB");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const addUserValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Please fill the full name field"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please fill the username field")
    .custom(async (value, { req }) => {
      const user = await db.getUserByUsername(req.body.username);
      if (value === user?.username) {
        throw new Error(
          "This username is already taken, please use different one"
        );
      }

      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please fill the password field"),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please fill the confirm password field")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),
];

exports.addUser = [
  addUserValidation,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("signup", { errors: errors.array()[0].msg });
    }

    const { fullName, username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        throw new Error("Failed to hash the password");
      } else {
        db.addUser(fullName, username, hashedPassword, "guest");
      }
    });

    res.redirect("/club");
  },
];

exports.logIn = passport.authenticate("local", {
  successRedirect: "/club",
  failureRedirect: "/login",
});
