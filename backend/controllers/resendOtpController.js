// const User = require("../model/userModel");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");

// let resendOtpController = async (req, res) => {
//   const { email } = req.body;

//   let existingUser = await User.find({ email: email });

//   try {
//     if (existingUser.length > 0) {
//       if ((existingUser.emailVerified = true)) {
//         return res.send({ error: "Email is already verified" });
//       } else {
//         let newotp = otpGenerator.generate(6, {
//           upperCaseAlphabets: false,
//           specialChars: false,
//         });
//         await User.findOneAndUpdate({ email: email }, { otp: newotp });
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: "tanvirejij@gmail.com",
//             pass: "rcre rwdm dxyw gtlm",
//           },
//         });

//         const info = await transporter.sendMail({
//           from: '"RealTodo"<tanvirejij@gmail.com>',
//           to: email,
//           subject: "Verification",
//           html: `<b>This is your verification code: ${newotp}</b>`,
//         });
//         res.send({ success: "Email sent. Please Check your Email" });
//       }
//     } else {
//       res.send({ error: "User not found" });
//     }
//   } catch (error) {
//     res.send(error);
//   }
// };

// module.exports = resendOtpController;

const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

let resendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      if (existingUser.emailVerified === true) {
        return res.send({ error: "Email is already verified" });
      } else if (!existingUser.otp) {
        let resendOtp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        await User.findOneAndUpdate({ email: email }, { otp: resendOtp });
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "tanvirejij@gmail.com",
            pass: "vtxx uypj vldj feiw",
          },
        });
        const info = await transporter.sendMail({
          from: '"Ecommerce"<tanvirejij@gmail.com>',
          to: email,
          subject: "OTP",
          html: `<b>This is your verification code: ${resendOtp}</b>`,
        });
        res.send({ error: "OTP is missing. Sending a new OTP." });
      } else {
        let newotp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        await User.findOneAndUpdate({ email: email }, { otp: newotp });
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "tanvirejij@gmail.com",
            pass: "vtxx uypj vldj feiw",
          },
        });

        const info = await transporter.sendMail({
          from: '"Ecommerce"<tanvirejij@gmail.com>',
          to: email,
          subject: "OTP",
          html: `<b>This is your verification code: ${newotp}</b>`,
        });
        res.send({ success: "Email sent. Please check your email." });
      }
    } else {
      res.send({ error: "User not found" });
    }
  } catch (error) {
    res.send({ error: "An error occurred. Please try again later." });
  }
};

module.exports = resendOtpController;
