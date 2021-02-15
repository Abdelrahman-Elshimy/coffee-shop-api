const productModel = require("../models/product.model");

exports.getProducts = (req, res, next) => {
  let product = new productModel.ProductModel();
  product
    .getAllProducts()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json({ message: "Connection failure" });
    });
};
exports.addProduct = (req, res, next) => {
  let product = new productModel.ProductModel();
  product
    .addNewProduct(req.body)
    .then(() => {
      res.status(200).json({ message: "Product added successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Product Insertion Error", error: err });
    });
};

exports.getProduct = (req, res, next) => {
  let product = new productModel.ProductModel();
  product
    .getProduct(req.params.id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json({ message: "Get Product Failure", error: err });
    });
};
