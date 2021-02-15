const catController = require("../controllers/category.controller");
const bodyParser = require("body-parser");
const router = require("express").Router();

// get all categories
router.get("/", catController.getCats);

// add new category
router.post("", bodyParser.json(), catController.addCat);
module.exports = router;
