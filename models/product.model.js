const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/coffee-shop";
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  sales: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: ObjectID,
    ref: "categorys",
  },
});

const Product = mongoose.model("product", productSchema);

exports.ProductModel = class ProductApi {
  // get all Products from database
  getAllProducts() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          return Product.find();
        })
        .then((products) => {
          mongoose.disconnect();
          resolve(products);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }

  // get one product
  getProduct(id) {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          return Product.findOne({ _id: id });
        })
        .then((product) => {
          mongoose.disconnect();
          resolve(product);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }

  // add new Product
  addNewProduct(product) {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          const productA = new Product(product);
          return productA.save();
        })
        .then(() => {
          mongoose.disconnect();
          resolve();
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }
};
