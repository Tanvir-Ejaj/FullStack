const Category = require("../model/categoryModel");

let approveCategoryController = async (req, res) => {
  const { id, status } = req.body;

  let updateCategory = await Category.findOneAndUpdate(
    { _id: id },
    { status: status == "waiting" ? "approved" : "waiting" },
    {
      new: true,
    }
  );
  res.send({ success: "updated" });
};

module.exports = approveCategoryController;