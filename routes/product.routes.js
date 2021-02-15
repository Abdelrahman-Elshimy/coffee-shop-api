const productController = require("../controllers/product.controller");
const bodyParser = require("body-parser");
const router = require("express").Router();

// get all categories
router.get("/", productController.getProducts);

// add new category
router.post("", bodyParser.json(), productController.addProduct);

// get product
router.get("/:id", productController.getProduct);
module.exports = router;
