const express = require("express");
const route = express.Router();
const registrationControllers = require("../../controllers/registrationControllers");
const otpController = require("../../controllers/otpController");
const secureApi = require("../../middleware/secureApi");
const loginController = require("../../controllers/loginController");
const linkController = require("../../controllers/linkController");
const forgetPasswordController = require("../../controllers/forgetPasswordController.js");
const newPasswordController = require("../../controllers/newPasswordController.js");

route.post("/registration", secureApi, registrationControllers);
route.post("/otpverification", otpController);
route.post("/linkverification", linkController);
route.post("/forgetpassword", forgetPasswordController);
route.post("/newpassword", newPasswordController);
route.post("/login", loginController);

module.exports = route;
