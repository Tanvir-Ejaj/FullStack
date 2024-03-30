const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

let registrationControllers = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send({ error: "Please Fill All Fild" });
  }

  if (password && password.length < 6) {
    return res.send({ error: "Password is too small" });
  }

  let existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    return res.send({ error: "Email Already Exist" });
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tanvirejij@gmail.com",
        pass: "vtxx uypj vldj feiw",
      },
    });

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const info = await transporter.sendMail({
      from: `"E commerce 👻" <tanvirejij@gmail.com>`, // sender address
      to: email, // list of receivers
      subject: "Verification Code", // Subject line
      html: `<b>This is your verification code :</b>${otp}`, // html body
    });

    bcrypt.hash(password, 10, async function (err, hash) {
      // Store hash in your password DB.
      let user = new User({
        name: name,
        email: email,
        password: hash,
        otp: otp,
      });

      user.save();
      res.send({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });
  }
};

module.exports = registrationControllers;
