const express = require("express");
const port = process.env.PORT || 3000;

const app = express();

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// Get Routes
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const bookingRoutes = require("./routes/booking.routes");

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/bookings", bookingRoutes);

app.listen(port, (req, res, next) => {
  console.log("Server Created");
});
