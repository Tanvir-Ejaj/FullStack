// **main code
//  const User = require("../model/userModel");
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

// **workable code
// const User = require("../model/userModel");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");

// let resendOtpController = async (req, res) => {
//   const { email } = req.body;

//   try {
//     let existingUser = await User.findOne({ email: email });

//     if (existingUser) {
//       if (existingUser.emailVerified === true) {
//         return res.send({ error: "Email is already verified" });
//       } else if (!existingUser.otp) {
//         let resendOtp = otpGenerator.generate(6, {
//           upperCaseAlphabets: false,
//           specialChars: false,
//         });
//         await User.findOneAndUpdate({ email: email }, { otp: resendOtp });
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: "tanvirejij@gmail.com",
//             pass: "vtxx uypj vldj feiw",
//           },
//         });
//         const info = await transporter.sendMail({
//           from: '"Ecommerce"<tanvirejij@gmail.com>',
//           to: email,
//           subject: "OTP",
//           html: `<b>This is your verification code: ${resendOtp}</b>`,
//         });
//         res.send({ success: "OTP was missing. Sending a new OTP." });
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
//             pass: "vtxx uypj vldj feiw",
//           },
//         });

//         const info = await transporter.sendMail({
//           from: '"Ecommerce"<tanvirejij@gmail.com>',
//           to: email,
//           subject: "OTP",
//           html: `<b>This is your verification code: ${newotp}</b>`,
//         });
//         res.send({ success: "Email sent. Please check your email." });
//       }
//     } else {
//       res.send({ error: "User not found" });
//     }
//   } catch (error) {
//     res.send({ error: "An error occurred. Please try again later." });
//   }
// };

// module.exports = resendOtpController;

const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require("../model/userModel");

const maxRetries = 3; // Maximum number of retries
const retryDelay = 1000; // Initial retry delay in milliseconds

const sendMailWithRetry = async (transporter, mailOptions, retries = 0) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error.code === "ESOCKET" && retries < maxRetries) {
      const delay = retryDelay * Math.pow(2, retries); // Exponential backoff
      console.log(`Retrying to send email... (${retries + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sendMailWithRetry(transporter, mailOptions, retries + 1);
    } else {
      throw error;
    }
  }
};

let resendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      if (existingUser.emailVerified === true) {
        return res.status(400).send({ error: "Email is already verified" });
      } else {
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        await User.findOneAndUpdate({ email: email }, { otp });

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for port 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: '"Ecommerce"<tanvirejij@gmail.com>',
          to: email,
          subject: "OTP",
          html: `<b>This is your verification code: ${otp}</b>`,
        };

        await sendMailWithRetry(transporter, mailOptions);

        res
          .status(200)
          .send({ success: "Email sent. Please check your email." });
      }
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred. Please try again later." });
  }
};

module.exports = resendOtpController;
