const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("Hello world!");
  res.end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listenning to https://localhost:${PORT}`);
});
