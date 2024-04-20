const User = require("../model/userModel.js");

let otpController = async (req, res) => {
  const { email, otp } = req.body;
  let findUser = await User.findOne({ email: email });
  console.log(findUser.otp);

  findUser.emailVerified; //fasle

  if (!findUser.emailVerified && findUser.otp == otp) {
    await User.findOneAndUpdate(
      { email: email },
      { otp: "", emailVerified: true }
    );
    res.send("Done");
  } else {
    res.send("Not Done");
  }
};

module.exports = otpController;
