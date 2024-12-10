const { Router } = require("express");
const controller = require("../controllers/clubController");

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/club", (req, res) => {
  const user = {
    fullName: req.body.fullName,
    membership: "guest",
  };

  res.render("club", { user });
});

router.post("/signup", controller.addUser);

module.exports = router;
