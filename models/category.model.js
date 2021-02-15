const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/coffee-shop";
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

const Category = mongoose.model("category", categorySchema);

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
};
