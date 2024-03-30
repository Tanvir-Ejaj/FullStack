const express = require("express");
const route = express.Router();
const registration = require("./registration");

route.use("/auth", registration);

module.exports = route;
