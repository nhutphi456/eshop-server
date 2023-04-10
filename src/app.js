const express = require("express");
const path = require("path");
const app = express();

const routes = require("./routes/index");

app.use(express.json());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);
//routes
app.use(routes);

module.exports = app;
