const User = require("../model/userModel.js");
var jwt = require("jsonwebtoken");

let linkController = async (req, res) => {

  const { token } = req.body;

  var decoded = jwt.verify(token, "shhhhh");
  console.log(decoded);

  let findUser = await User.findOne({ email: decoded.email });
  
  if (!findUser.emailVerified) {
    await User.findOneAndUpdate(
      { email: decoded.email },
      { emailVerified: true }
    );
    res.send("Done");
  } else {
    res.send("Not Done");
  }
};

module.exports = linkController;
