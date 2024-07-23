const Category = require("../model/categoryModel");

let deleteCategoryController = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.send({ success: "Deleted" });
};

module.exports = deleteCategoryController;
