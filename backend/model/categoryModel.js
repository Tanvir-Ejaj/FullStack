const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ["approved", "waiting", "reject"],
    default: "waiting",
  },
});

module.exports = mongoose.model("Category", categorySchema);

// ** Updated Model From CHAT GPT for buttons **

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const categorySchema = new Schema({
//   name: {
//     type: String,
//     required: true, // Ensure that the name is required
//   },
//   status: {
//     type: String,
//     enum: ["approved", "waiting", "reject"],
//     default: "waiting",
//   },
// });

// module.exports = mongoose.model("Category", categorySchema);
