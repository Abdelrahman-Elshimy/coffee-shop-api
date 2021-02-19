const productController = require("../controllers/product.controller");
const bodyParser = require("body-parser");
const router = require("express").Router();

// get all products
router.get("/", productController.getProducts);

// add new category
router.post("", bodyParser.json(), productController.addProduct);

// get best sellers products of coffees
router.get("/getBestSellersCoffee", productController.getBestSellerCoffee);

// get products of each category
router.get(
  "/getProductsOfeacCategory",
  productController.getProductsOfEachCategory
);

// get product
router.get("/:id", productController.getProduct);
module.exports = router;
