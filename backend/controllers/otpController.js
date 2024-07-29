// const User = require("../model/userModel.js");

// let otpController = async (req, res) => {
//   const { email, otp } = req.body;
//   let findUser = await User.findOne({ email: email });
//   console.log(findUser.otp);

//   findUser.emailVerified; //fasle

//   if (!findUser.emailVerified && findUser.otp == otp) {
//     await User.findOneAndUpdate(
//       { email: email },
//       { otp: "", emailVerified: true }
//     );
//     res.send("OTP Verified");
//   } else {
//     res.send("OTP Not Match");
//   }
// };

// module.exports = otpController;

// const User = require("../model/userModel");

// let otpController = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).send("Email and OTP are required");
//   }

//   try {
//     // Find the user by email
//     let findUser = await User.findOne({ email: email });

//     if (!findUser) {
//       return res.status(404).send("User not found");
//     }

//     // Logging OTP should be avoided in production for security reasons
//     // console.log(findUser.otp);

//     if (!findUser.emailVerified && findUser.otp === otp) {
//       await User.findOneAndUpdate(
//         { email: email },
//         { otp: "", emailVerified: true }
//       );
//       res.status(200).send("OTP Verified");
//     } else {
//       res.status(400).send("OTP Not Match");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = otpController;

const User = require("../model/userModel");

let otpController = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({ error: "Email and OTP are required" });
  }

  try {
    // Find the user by email
    let findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.json({ error: "User not found" });
    }

    if (!findUser.emailVerified && findUser.otp === otp) {
      await User.findOneAndUpdate(
        { email: email },
        { otp: "", emailVerified: true }
      );
      return res.json({ success: "OTP Verified Successfully!" });
    } else {
      return res.json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal Server Error" });
  }
};

module.exports = otpController;
