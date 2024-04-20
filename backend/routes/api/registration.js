const express = require("express");
const route = express.Router();
const registrationControllers = require("../../controllers/registrationControllers");
const otpController = require("../../controllers/otpController");
const secureApi = require("../../middleware/secureApi");
const loginController = require("../../controllers/loginController");
const linkController = require("../../controllers/linkController");

route.post("/registration", secureApi, registrationControllers);
route.post("/otpverification/:email", otpController);
route.post("/linkverification", linkController);
route.post("/login", loginController);

module.exports = route;
