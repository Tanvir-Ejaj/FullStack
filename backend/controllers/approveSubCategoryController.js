const Category = require("../model/categoryModel");
const SubCategory = require("../model/subCategoryModel");

let approveSubCategoryController = async (req, res) => {
  const { id, status } = req.body;

  try {
    let updateSubCategory = await SubCategory.findOneAndUpdate(
      {
        _id: id,
      },
      { status: status == "waiting" ? "approved" : "waiting" },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: `Sub-category ${status} successfully`,
    });
  } catch (error) {
    console.error("Error updating sub-category status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = approveSubCategoryController;
