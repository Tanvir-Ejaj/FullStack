const User = require("../model/userModel.js");

let otpController = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  let findUser = await User.findOne({ email: email });

  if (findUser.emailVerified && findUser.otp == otp) {
    await User.findOneAndUpdate({ email: email }, { otp: "" });
    res.send("Done")
  } else {
    res.send("Not Done")
  }
};

module.exports = otpController;
