const { Router } = require("express");
const messageController = require("../controllers/messageController");

const router = Router();

router.post("/addMessage", isAuthenticated, messageController.addMessage);

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).send("You are not authenticated");
}

module.exports = router;
