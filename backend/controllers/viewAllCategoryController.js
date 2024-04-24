const Category = require("../model/categoryModel");

let viewAllCategoryController = async (req, res) => {
  let data = await Category.find();
  res.send(data);
};

module.exports = viewAllCategoryController;
