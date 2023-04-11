const express = require("express");
const helmet = require("helmet");
const path = require("path");
const app = express();

const routes = require("./routes/index");

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);
require("./utils/passport")(app);
//routes
app.use(routes);

module.exports = app;
