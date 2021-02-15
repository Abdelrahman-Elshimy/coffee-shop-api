const express = require("express");
const port = process.env.PORT || 3000;

const app = express();

// Get Routes
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.listen(port, (req, res, next) => {
  console.log("Server Created");
});
