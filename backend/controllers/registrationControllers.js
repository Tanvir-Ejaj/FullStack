// const User = require("../model/userModel");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");
// const jwt = require("jsonwebtoken");

// let registrationControllers = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.send({ error: "Please Fill All Fild" });
//   }

//   if (password && password.length < 6) {
//     return res.send({ error: "Password is too small" });
//   }

//   // Find the user
//   let existingUser = await User.find({ email: email });

//   // find the email and send an email
//   if (existingUser.length > 0) {
//     return res.send({ error: "Email Already Exist" });
//   } else {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "tanvirejij@gmail.com",
//         pass: "vtxx uypj vldj feiw",
//       },
//     });

//     // create a otp
//     let otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       specialChars: false,
//     });

//     // add the main information
//     const info = await transporter.sendMail({
//       from: `"E commerce 👻" <tanvirejij@gmail.com>`, // sender address
//       to: email, // list of receivers
//       subject: "Verification Code", // Subject line
//       html: `<b>This is your verification code :</b>${otp}`, // html body
//     });

//     // hash the password
//     bcrypt.hash(password, 10, async function (err, hash) {
//       // Store hash in your password DB.
//       let user = new User({
//         name: name,
//         email: email,
//         password: hash,
//         otp: otp,
//       });
//       user.save();

//       // email verify code
//       // jwt.sign({ email: email }, "shhhhh", async function (err, token) {
//       //   const info = transporter.sendMail({
//       //     from: `"E commerce 👻"`, // sender address
//       //     to: email, // list of receivers
//       //     subject: "Verification Code", // Subject line
//       //     html: `<a href="http://localhost:5173/emailverification/${token}">Click Here to verify</a>`, // html body
//       //   });
//       // });

//       // time for link
//       // setTimeout(async () => {
//       //   await User.findOneAndUpdate({ email: email });
//       //   console.log("asdasd");
//       // }, 10000);

//       res.send({
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       });
//     });
//   }
// };

// module.exports = registrationControllers;

// ** working code-1
// const User = require("../model/userModel.js");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");
// const jwt = require("jsonwebtoken");

// let registrationController = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).send({ error: "Please fill all fields" });
//   }

//   if (password.length < 6) {
//     return res.status(400).send({ error: "Password is too short" });
//   }

//   let existingUser = await User.findOne({ email: email });

//   if (existingUser) {
//     return res.status(400).send({ error: "Email already exists" });
//   }

//   // Generate OTP
//   let otp = otpGenerator.generate(6, {
//     upperCaseAlphabets: false,
//     specialChars: false,
//   });

//   // Hash the password
//   bcrypt.hash(password, 10, async function (err, hash) {
//     if (err) {
//       return res.status(500).send({ error: "Internal Server Error" });
//     }

//     // Create new user
//     let user = new User({
//       name: name,
//       email: email,
//       password: hash,
//       otp: otp,
//       emailVerified: false,
//     });

//     try {
//       await user.save();

//       // Configure Nodemailer
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       // Send OTP email
//       await transporter.sendMail({
//         from: `"E-commerce" ${process.env.EMAIL_USER}`,
//         to: email,
//         subject: "Verification Code",
//         html: `<b>This is your verification code:</b> ${otp}`,
//       });

//       res.status(201).send({
//         message:
//           "Registration successful! Please check your email for the OTP.",
//         user: {
//           name: user.name,
//           email: user.email,
//         },
//       });
//     } catch (error) {
//       res.status(500).send({ error: "Internal Server Error" });
//     }
//   });
// };

// module.exports = registrationController;

const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
require("dotenv").config();

// Retry function for sending emails
const sendMailWithRetry = async (transporter, mailOptions, retries = 0) => {
  const maxRetries = 3;
  const retryDelay = 1000;

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error.code === "ESOCKET" && retries < maxRetries) {
      const delay = retryDelay * Math.pow(2, retries);
      console.log(`Retrying to send email... (${retries + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sendMailWithRetry(transporter, mailOptions, retries + 1);
    } else {
      throw error;
    }
  }
};

let registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: "Please fill all fields" });
  }

  if (password.length < 6) {
    return res.status(400).send({ error: "Password is too short" });
  }

  let existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send({ error: "Email already exists" });
  }

  // Generate OTP
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // Hash the password
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).send({ error: "Internal Server Error" });
    }

    // Create new user
    let user = new User({
      name,
      email,
      password: hash,
      otp,
      emailVerified: false,
    });

    try {
      await user.save();

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email options with improved HTML format
      const mailOptions = {
        from: `"E-commerce" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
            <h2 style="color: #444; text-align: center;">Email Verification</h2>
            <p style="font-size: 16px;">Hello <b>${name}</b>,</p>
            <p style="font-size: 16px;">Thank you for registering with us! To complete your registration, please use the following OTP (One Time Password) to verify your email address:</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="display: inline-block; padding: 10px 20px; font-size: 24px; color: #fff; background-color: #28a745; border-radius: 5px; letter-spacing: 2px;">
                ${otp}
              </span>
            </div>
            <p style="font-size: 16px;">If you did not register for an account, please disregard this email.</p>
            <p style="font-size: 16px;">Best regards,</p>
            <p style="font-size: 16px;">The E-commerce Team</p>
          </div>
        `,
      };

      // Send OTP email with retry logic
      await sendMailWithRetry(transporter, mailOptions);

      res.status(201).send({
        message:
          "Registration successful! Please check your email for the OTP.",
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
};

module.exports = registrationController;
