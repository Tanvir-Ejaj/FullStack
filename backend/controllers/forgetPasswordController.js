//  ** main
// const User = require("../model/userModel");
// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");

// let forgetPasswordController = async (req, res) => {
//   const { email } = req.body;

//   // Find the user
//   let existingUser = await User.find({ email: email });

//   // find the email and send an email
//   if (existingUser.length > 0) {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "tanvirejij@gmail.com",
//         pass: "vtxx uypj vldj feiw",
//       },
//     });
//     jwt.sign(
//       { email: email },
//       "shhhhh",
//       { expiresIn: "1h" },
//       async function (err, token) {
//         const info = transporter.sendMail({
//           from: `"E commerce 👻"`,
//           to: email,
//           subject: "Reset Password",
//           html: `<p>This is your Forget Password Link <a href="http://localhost:5173/newpassword/${token}">Click Here</a> or copy this: http://localhost:5173/newpassword/${token}</p>`,
//         });
//       }
//     );
//     res.send({ success: "Email sent" });
//   } else {
//     res.send({ error: "User not found" });
//   }
// };

// module.exports = forgetPasswordController;

// ** proper error managemnet
// const User = require("../model/userModel");
// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const forgetPasswordController = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find the user
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     // Create transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Generate a JWT token
//     jwt.sign(
//       { email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       async (err, token) => {
//         if (err) {
//           console.error("Error generating token:", err);
//           return res.status(500).send({ error: "Error generating token" });
//         }

//         // Send email with the reset password link
//         try {
//           await transporter.sendMail({
//             from: `"E-commerce 👻" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: "Reset Password",
//             html: `<p>This is your Forget Password Link: <a href="http://localhost:5173/newpassword/${token}">Click Here</a> or copy this: http://localhost:5173/newpassword/${token}</p>`,
//           });

//           res.status(200).send({ success: "Email sent" });
//         } catch (emailError) {
//           console.error("Error sending email:", emailError);
//           res.status(500).send({ error: "Error sending email" });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error in forgetPasswordController:", error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// };
// module.exports = forgetPasswordController;

// **retry
// const User = require("../model/userModel");
// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const maxRetries = 3; // Maximum number of retries
// const retryDelay = 1000; // Initial retry delay in milliseconds

// const sendMailWithRetry = async (transporter, mailOptions, retries = 0) => {
//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     if (error.code === "ESOCKET" && retries < maxRetries) {
//       const delay = retryDelay * Math.pow(2, retries); // Exponential backoff
//       console.log(`Retrying to send email... (${retries + 1}/${maxRetries})`);
//       await new Promise((resolve) => setTimeout(resolve, delay));
//       return sendMailWithRetry(transporter, mailOptions, retries + 1);
//     } else {
//       throw error;
//     }
//   }
// };

// const forgetPasswordController = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find the user
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     // Create transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // true for port 465, false for other ports
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Generate a JWT token
//     jwt.sign(
//       { email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       async (err, token) => {
//         if (err) {
//           console.error("Error generating token:", err);
//           return res.status(500).send({ error: "Error generating token" });
//         }

//         // Prepare email options
//         const mailOptions = {
//           from: `"E-commerce 👻" <${process.env.EMAIL_USER}>`,
//           to: email,
//           subject: "Reset Password",
//           html: `<p>This is your Forget Password Link: <a href="http://localhost:5173/newpassword/${token}">Click Here</a> or copy this: http://localhost:5173/newpassword/${token}</p>`,
//         };

//         // Send email with retry logic
//         try {
//           await sendMailWithRetry(transporter, mailOptions);
//           res.status(200).send({ success: "Email sent" });
//         } catch (emailError) {
//           console.error("Error sending email:", emailError);
//           res.status(500).send({ error: "Error sending email" });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error in forgetPasswordController:", error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// };

// module.exports = forgetPasswordController;



// **Final Code
const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      async (err, token) => {
        if (err) {
          console.error("Error generating token:", err);
          return res.status(500).send({ error: "Error generating token" });
        }

        const resetLink = `http://localhost:5173/newpassword/${token}`;

        const mailOptions = {
          from: `"E-commerce 👻" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Reset Your Password",
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://your-logo-url.com/logo.png" alt="E-commerce Logo" style="max-width: 150px;"/>
              </div>
              <h2 style="color: #007BFF; text-align: center;">Password Reset Request</h2>
              <p>Hi ${existingUser.name || "User"},</p>
              <p>We received a request to reset your password for your E-commerce account. Please click the button below to reset your password:</p>
              <div style="text-align: center; margin: 20px;">
                <a href="${resetLink}" style="background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
              </div>
              <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
              <p><a href="${resetLink}" style="color: #007BFF;">${resetLink}</a></p>
              <p>This link will expire in 1 hour. If you didn't request a password reset, please ignore this email or contact support if you have any concerns.</p>
              <p>Thank you,<br/>The E-commerce Team</p>
              <hr style="margin: 40px 0;"/>
              <p style="font-size: 12px; color: #777;">If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
              <p style="font-size: 12px; color: #777;"><a href="${resetLink}" style="color: #007BFF;">${resetLink}</a></p>
              <p style="font-size: 12px; color: #777;">© ${new Date().getFullYear()} E-commerce. All rights reserved.</p>
            </div>
          `,
        };

        try {
          await sendMailWithRetry(transporter, mailOptions);
          res.status(200).send({ success: "Email sent" });
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          res.status(500).send({ error: "Error sending email" });
        }
      }
    );
  } catch (error) {
    console.error("Error in forgetPasswordController:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = forgetPasswordController;
