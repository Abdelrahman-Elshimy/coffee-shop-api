const mongoose = require("mongoose");
const DB_URL =
  "mongodb+srv://abdo:12345678Abdo@cluster0.3rkji.mongodb.net/coffee-shop?retryWrites=true&w=majority";
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

const Category = mongoose.model("category", categorySchema);

exports.getCategorModel = () => {
  return Category;
};

exports.CategoryModel = class CategoryApi {
  // get all categories from database
  getAllCategories() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          return Category.find();
        })
        .then((cats) => {
          mongoose.disconnect();
          resolve(cats);
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  }

  // add new category
  addNewCategory(category) {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => {
          const cat = new Category(category);
          return cat.save();
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

  // getProductsOfEachCategory
};
