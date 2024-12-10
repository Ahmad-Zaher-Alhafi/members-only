const db = require("../db/clubDB");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const addMessageValidation = [
  body("title").trim().notEmpty().withMessage("Please fill the title field"),
  body("text").trim().notEmpty().withMessage("Please fill the text field"),
];

exports.addMessage = [
  addMessageValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("club", {
        user: req.user,
        errors: errors.array()[0].msg,
      });
    }

    const { title, text } = req.body;

    await db.addMessage(req.user.id, title, new Date(), text);

    res.redirect("/club");
  },
];

exports.logIn = passport.authenticate("local", {
  successRedirect: "/club",
  failureRedirect: "/login",
});

exports.getAllMessages = async (req, res) => {
  const messages = await db.getAllMessages();
  const updatedMessagesArray = messages.map(({ fullname, ...rest }) => ({
    fullName: fullname,
    ...rest,
  }));

  return updatedMessagesArray;
};
