const express = require("express");
const route = express.Router();
const authenticationRoute = require("./auth");
const categoryRoute = require("./category");
const produtRoute = require("./product");

route.use("/auth", authenticationRoute);
route.use("/category", categoryRoute);
route.use("/product", produtRoute);

module.exports = route;
