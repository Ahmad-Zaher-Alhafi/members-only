const express = require("express");
const router = require("./routes/router");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listenning to https://localhost:${PORT}`);
});
