const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("this is working");
});

app.listen(8000, () => {
  console.log("app is running on port 8000");
});
