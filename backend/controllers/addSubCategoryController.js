const SubCategory = require("../model/subCategoryModel");

let addSubCategoryController = async (req, res) => {
  const { name, categoryId } = req.body;

  let existingCategory = await SubCategory.find({ name: name.toLowerCase() });

  if (existingCategory.length > 0) {
    return res.send({ error: "Sub-Category exits" });
  } else {
    let category = new SubCategory({
      name: name.toLowerCase(),
      categoryId: categoryId,
    });
    category.save();
    res.send({ success: "Sub-Category created" });
  }
};

module.exports = addSubCategoryController;
