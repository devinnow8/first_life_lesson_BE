const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
app.use(cors({
  origin: '*'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/db");
const routes = require("./app/routes/index.js");
app.use("/", routes);

module.exports = app;
