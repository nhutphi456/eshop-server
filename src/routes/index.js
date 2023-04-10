const router = require("express").Router();
const routes = require("../routes/api/index");

const keys = require("../config/keys");
const { apiURL } = keys.app;

router.use(apiURL, routes);

module.exports = router;
