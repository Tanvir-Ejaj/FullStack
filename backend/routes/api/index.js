const express = require("express");
const route = express.Router();
const registration = require("./auth");
const productsRoutes = require("./productRoute");

route.use("/auth", registration);
route.use("/products", productsRoutes);

module.exports = route;
