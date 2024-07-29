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

const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

let registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: "Please fill all fields" });
  }

  if (password.length < 6) {
    return res.status(400).send({ error: "Password is too short" });
  }

  let existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).send({ error: "Email already exists" });
  }

  // Generate OTP
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // Hash the password
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return res.status(500).send({ error: "Internal Server Error" });
    }

    // Create new user
    let user = new User({
      name: name,
      email: email,
      password: hash,
      otp: otp,
      emailVerified: false,
    });

    try {
      await user.save();

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tanvirejij@gmail.com",
          pass: "vtxx uypj vldj feiw",
        },
      });

      // Send OTP email
      await transporter.sendMail({
        from: `"E-commerce" <your-email@gmail.com>`,
        to: email,
        subject: "Verification Code",
        html: `<b>This is your verification code:</b> ${otp}`,
      });

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
