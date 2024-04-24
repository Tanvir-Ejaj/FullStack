const Category = require("../model/categoryModel");

let addCategoryController = async (req, res) => {
  const { name } = req.body;

  let existingCategory = await Category.find({ name: name.toLowerCase() });

  if (existingCategory.length > 0) {
    return res.send({ error: "category exits" });
  } else {
    let category = new Category({
      name: name.toLowerCase(),
    });
    category.save();
    res.send({ success: "category created" });
  }
};

module.exports = addCategoryController;
