const Product = require("../model/productModel");

let addProductController = async (req, res) => {
  const { name } = req.body;

  let existingProduct = await Product.find({ name: name.toLowerCase() });

  if (existingProduct.length > 0) {
    return res.send({ error: "Product exits" });
  } else {
    let product = new Product({
      name: name.toLowerCase(),
      image: `/uploads/${req.file.filename}`,
    });
    product.save();
    res.send({ success: "Product created" });
  }
};

module.exports = addProductController;
