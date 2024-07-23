const express = require("express");
const addCategoryController = require("../../controllers/addCategoryController");
const addSubCategoryController = require("../../controllers/addSubCategoryController");
const viewSubCategoryController = require("../../controllers/viewSubCategoryController");
const viewAllCategoryController = require("../../controllers/viewAllCategoryController");
const verifyToken = require("../../middleware/verifyToken");
const secureApi = require("../../middleware/secureApi");
const approveCategoryController = require("../../controllers/approveCategoryController");
const deleteCategoryController = require("../../controllers/deleteCategoryController");
const editCategoryController = require("../../controllers/editCategoryController");
const approveSubCategoryController = require("../../controllers/approveSubCategoryController");
const deleteSubCategoryController = require("../../controllers/DeleteSubCategoryController");
const route = express.Router();

route.post("/createcategory", addCategoryController);
route.post("/createsubcategory", addSubCategoryController);
route.post("/approvecategory", approveCategoryController);
route.post("/approvesubcategory", approveSubCategoryController);

route.get("/viewallcategory", viewAllCategoryController);
route.get("/viewsubcategory", viewSubCategoryController);

route.post("/editcategory", editCategoryController);

route.delete("/deletecategory/:id", deleteCategoryController);
route.delete("/deletesubcategory/:id", deleteSubCategoryController);

module.exports = route;
