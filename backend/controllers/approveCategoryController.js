const Category = require("../model/categoryModel");

let approveCategoryController = async (req, res) => {
  const { id, status } = req.body;

  let updateCategory = await Category.findOneAndUpdate(
    { _id: id },
    { status: status == "waiting" ? "approve" : "waiting" },
    {
      new: true,
    }
  );
  res.send("updated");
};

module.exports = approveCategoryController;
