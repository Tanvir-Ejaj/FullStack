let secureApi = (req, res, next) => {
  if (req.headers.authorization == "tushar@1122") {
    next();
  } else res.send({ error: "not secure" });
};

module.exports = secureApi;
