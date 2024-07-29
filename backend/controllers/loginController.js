const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

let loginController = async (req, res) => {
  const { email, password } = req.body;
  let findUser = await User.findOne({ email: email });

  if (findUser) {
    if (findUser.emailVerified == true) {
      bcrypt.compare(password, findUser.password, function (err, result) {
        var token = jwt.sign(
          { id: findUser._id, email: findUser.email },
          "shhhhh",
          { expiresIn: "24h" }
        );
        if (result) {
          res.send({
            token: token,
            email: findUser.email,
            name: findUser.name,
            role: findUser.role,
            success: "Login Successfull",
          });
        } else {
          res.send({ error: "Please check your email or password" });
        }
      });
    } else {
      res.send({ error: "Please Verify Your email" });
    }
  } else {
    res.send({ error: "User not found" });
  }
};

module.exports = loginController;
