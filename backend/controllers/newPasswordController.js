// const User = require("../model/userModel.js");
// var jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// let newPasswordController = async (req, res) => {
//   const { password, token } = req.body;
//   var decoded = jwt.verify(token, "shhhhh");

//   bcrypt.hash(password, 10, async function (err, hash) {
//     await User.findOneAndUpdate({ email: decoded.email }, { password: hash });
//     res.send({ sucess: "Password Changed" });
//   });
// };

// module.exports = newPasswordController;

const User = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const newPasswordController = async (req, res) => {
  const { password, token } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hash the new password
    const hash = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await User.findOneAndUpdate({ email: decoded.email }, { password: hash });

    res.status(200).send({ success: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);

    // Handle different types of errors
    if (error.name === "TokenExpiredError") {
      res.status(400).send({ error: "Link has expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(400).send({ error: "Invalid token" });
    } else {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
};

module.exports = newPasswordController;
