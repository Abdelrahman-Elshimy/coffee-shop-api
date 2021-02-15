const CatModel = require("../models/category.model");

exports.getCats = (req, res, next) => {
  let cat = new CatModel.CategoryModel();
  cat
    .getAllCategories()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Connection failure" });
    });
};
exports.addCat = (req, res, next) => {
  let category = {
    name: req.body.name,
    description: req.body.description,
  };
  let cat = new CatModel.CategoryModel();
  cat
    .addNewCategory(category)
    .then(() => {
      res.status(200).json({ message: "Category Add Successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Category Insertion Error", error: err });
    });
};
