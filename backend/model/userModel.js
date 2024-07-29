const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  // name: String,
  // email: String,
  // password: String,
  // role: {
  //   type: String,
  //   enum: ["Admin", "Merchant", "User"],
  //   default: "User",
  // },
  // otp: String,
  // emailVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
