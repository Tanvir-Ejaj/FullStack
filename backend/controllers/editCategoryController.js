const Category = require("../model/categoryModel");

let editCategoryController = async (req, res) => {
  const { name, oldName } = req.body;
  let existingCategory = await Category.find({
    name: name,
  });

  if (existingCategory.length > 0) {
    return res.send({ error: "category exits" });
  } else {
    let updateCategory = await Category.findOneAndUpdate(
      { name: oldName },
      { name: name.toLowerCase() },
      {
        new: true,
      }
    );
    res.send({ success: "category updated" });
  }
};

module.exports = editCategoryController;
