const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const Category = require("./category.model").getCategorModel();
const {
  getProductsOfEachCategory,
} = require("../controllers/product.controller");
const DB_URL =
  "mongodb+srv://abdo:12345678Abdo@cluster0.3rkji.mongodb.net/coffee-shop?retryWrites=true&w=majority";
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
  image: {
    type: String,
    default: "menu-2.jpg",
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

  getBestSellerOfCategoryCoffee() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          // '602adc8db12eb10d9ce6b37a'
          return Product.find({ category: "60311f762839581fc4b945a8" })
            .limit(4)
            .sort({ sales: -1 });
        })
        .then((productsBestSellerCoffee) => {
          mongoose.disconnect();
          resolve(productsBestSellerCoffee);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }
  getProductsOfEachCategory() {
    let MongoClient = require("mongodb").MongoClient;
    let url =
      "mongodb+srv://abdo:12345678Abdo@cluster0.3rkji.mongodb.net/coffee-shop?retryWrites=true&w=majority";
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function (err, db) {
        if (err) reject(err);
        var dbo = db.db("coffee-shop");
        dbo
          .collection("categories")
          .aggregate([
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "catProducts",
              },
            },
          ])
          .toArray(function (err, res) {
            if (err) reject(err);
            resolve(res);
            db.close();
          });
      });
    });
  }
};
