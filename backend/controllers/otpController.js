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
    res.send("OTP Verified");
  } else {
    res.send("OTP Not Match");
  }
};

module.exports = otpController;
