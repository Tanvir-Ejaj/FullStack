const express = require("express");
const addCategoryController = require("../../controllers/addCategoryController");
const addSubCategoryController = require("../../controllers/addSubCategoryController");
const viewSubCategoryController = require("../../controllers/viewSubCategoryController");
const viewAllCategoryController = require("../../controllers/viewAllCategoryController");
const verifyToken = require("../../middleware/verifyToken");
const secureApi = require("../../middleware/secureApi");
const approveCategoryController = require("../../controllers/approveCategoryController");
const route = express.Router();


route.post("/createcategory", secureApi ,verifyToken, addCategoryController);
route.post("/createsubcategory", addSubCategoryController);
route.post("/approvecategory", approveCategoryController);

route.get("/viewallcategory", viewAllCategoryController);
route.get("/viewsubcategory", viewSubCategoryController);

module.exports = route;
