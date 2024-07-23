const Category = require("../model/categoryModel");
const SubCategory = require("../model/subCategoryModel");

let deleteSubCategoryController = async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);

  res.send({ success: "Deleted" });
};

module.exports = deleteSubCategoryController;
