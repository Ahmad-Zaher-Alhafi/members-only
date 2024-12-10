const { Router } = require("express");
const controller = require("../controllers/clubController");

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/club", async (req, res) => {
  let user = await req.user;
  user = {
    ...user,
    fullName: user.fullname,
  };

  res.render("club", { user });
});

router.post("/signup", controller.addUser);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", controller.logIn);

module.exports = router;
