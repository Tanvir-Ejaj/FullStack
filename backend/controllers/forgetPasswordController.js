const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

let forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  // Find the user
  let existingUser = await User.find({ email: email });

  // find the email and send an email
  if (existingUser.length > 0) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tanvirejij@gmail.com",
        pass: "vtxx uypj vldj feiw",
      },
    });
    jwt.sign({ email: email }, "shhhhh", async function (err, token) {
      const info = transporter.sendMail({
        from: `"E commerce 👻"`,
        to: email,
        subject: "Reset Password",
        html: `<a href="http://localhost:5173/newpassword/${token}">Click Here to Reset The Password</a>`,
      });
    });
    res.send("mail sent");
    // await User.findOneAndUpdate({ email: email }, { password:password });
  } else {
    res.send({ error: "not found" });
  }
};

module.exports = forgetPasswordController;
