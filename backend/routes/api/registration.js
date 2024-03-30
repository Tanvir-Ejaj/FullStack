const express = require("express");
const route = express.Router();
const registrationControllers = require("../../controllers/registrationControllers");
const otpController = require("../../controllers/otpController");
const secureApi = require("../../middleware/secureApi");

route.post("/registration", secureApi, registrationControllers);
route.post("/otpverification", otpController);

module.exports = route;
