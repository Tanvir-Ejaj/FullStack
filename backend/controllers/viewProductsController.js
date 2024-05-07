const Product = require("../model/productModel");

let viewProductController = async (req, res) => {
  let data = await Product.find();
  res.send(data);
};

module.exports = viewProductController;
