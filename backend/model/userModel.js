const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Admin", "Merchant", "User"],
    default: "User",
  },
  otp: String,
});

module.exports = mongoose.model("User", userSchema);
