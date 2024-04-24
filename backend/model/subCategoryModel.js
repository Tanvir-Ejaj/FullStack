const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubcategorySchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ["approve", "waiting", "reject"],
    default: "waiting",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("SubCategory", SubcategorySchema);
