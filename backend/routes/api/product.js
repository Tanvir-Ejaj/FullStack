const express = require("express");
const route = express.Router();
const upload = require("../../middleware/multer");
const addProductController = require("../../controllers/addProductController");
const viewProductController = require("../../controllers/viewProductsController");


route.post("/createproduct", upload.single("avatar"), addProductController);

route.get("/viewproduct", viewProductController);

module.exports = route;
