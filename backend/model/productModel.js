const mongoose = require("mongoose");
const { Schema } = mongoose;

const poductSchema = new Schema({
  name: String,
  image: String,
  description: String,
  // status: {
  //   type: String,
  //   enum: ["approve", "waiting", "reject"],
  //   default: "waiting",
  // },
});

module.exports = mongoose.model("Product", poductSchema);
