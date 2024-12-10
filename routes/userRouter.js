const { Router } = require("express");
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.render("index");
});

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});

userRouter.get("/club", isAuthenticated, async (req, res) => {
  let user = await req.user;
  user = {
    ...user,
    fullName: user.fullname,
  };

  const messages = await messageController.getAllMessages();

  res.render("club", { user, messages });
});

userRouter.post("/signup", userController.addUser);

userRouter.get("/login", (req, res) => {
  res.render("login");
});
userRouter.post("/login", userController.logIn);

userRouter.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).send("You are not authenticated");
}

module.exports = userRouter;
