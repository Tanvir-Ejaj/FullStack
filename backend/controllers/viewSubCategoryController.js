const SubCategory = require("../model/subCategoryModel");
const Category = require("../model/categoryModel");

let viewSubCategoryController = async (req, res) => {
  let data = await SubCategory.find().populate("categoryId");
  res.send(data);
};

module.exports = viewSubCategoryController;
