let secureApi = (req, res, next) => {
  if (req.headers.authorization == "tushar@1122") {
    next();
  } else {
    res.status(401);
    res.send({ error: "not secure" });
  }
};

module.exports = secureApi;
