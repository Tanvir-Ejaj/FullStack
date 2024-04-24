const express = require("express");
const route = express.Router();
const registrationControllers = require("../../controllers/registrationControllers.js");
const otpController = require("../../controllers/otpController.js");
const secureApi = require("../../middleware/secureApi.js");
const loginController = require("../../controllers/loginController.js");
const linkController = require("../../controllers/linkController.js");
const forgetPasswordController = require("../../controllers/forgetPasswordController.js");
const newPasswordController = require("../../controllers/newPasswordController.js");

route.post("/registration", secureApi, registrationControllers);
route.post("/otpverification", otpController);
route.post("/linkverification", linkController);
route.post("/forgetpassword", forgetPasswordController);
route.post("/newpassword", newPasswordController);
route.post("/login", loginController);

module.exports = route;
