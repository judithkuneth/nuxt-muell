const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodRouter = require("../routes/foodRoutes");
const productRouter = require("../routes/productRoutes");
const priceRouter = require("../routes/priceRoutes");
const marketRouter = require("../routes/marketRoutes");
const marketTypeRouter = require("../routes/marketTypeRoutes");
require("dotenv").config();

// cors; http://localhost:3000
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

const app = express();

app.use(express.json());
// app.options("*", cors()); // include before other routes
app.use(cors(corsOptions));

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(foodRouter, productRouter, priceRouter, marketRouter, marketTypeRouter);

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

// app.listen(app.listen(process.env.PORT || 3000));

app.listen(process.env.PORT, function () {
  console.log("CORS-enabled web server listening on port 3002");
});

// app.listen(3002, () => {
//   console.log("Server is running...");
// });
