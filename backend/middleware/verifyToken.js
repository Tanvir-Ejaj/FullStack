var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.send("Token Required");
  } else {
    jwt.verify(token, "shhhhh", function (err, decoded) {
      if (decoded) {
        next();
      } else {
        res.send("Valid Token Required");
      }
    });
  }
};

module.exports = verifyToken;
