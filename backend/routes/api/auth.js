const express = require("express");
const route = express.Router();
const registrationControllers = require("../../controllers/registrationControllers");
const secureApi = require("../../middleware/secureApi");

route.post("/registration", secureApi, registrationControllers);

module.exports = route;
