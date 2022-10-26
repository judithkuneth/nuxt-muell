const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodRouter = require("../routes/foodRoutes");
const productRouter = require("../routes/productRoutes");
const priceRouter = require("../routes/priceRoutes");
const marketRouter = require("../routes/marketRoutes");
const marketTypeRouter = require("../routes/marketTypeRoutes");
require("dotenv").config();

process.env.CORS_ORIGIN = "https://myfoodbasket.herokuapp.com";
// cors; http://localhost:3000
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 3002,
};

const app = express();

app.use(express.json());
// app.options("*", cors()); // include before other routes
app.use(cors(corsOptions));

mongoose.connect(process.env.CORS_ORIGIN, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(foodRouter, productRouter, priceRouter, marketRouter, marketTypeRouter);

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

// app.listen(app.listen(process.env.PORT || 3000));
console.log("process.env.PORT!!!!!!", process.env.PORT);
console.log("process.env.DB_URI!!!!!!", process.env.DB_URI);
console.log("process.env.cORS_ORIGIN!!!!!!", process.env.CORS_ORIGIN);

app.listen(process.env.PORT || 3002, function () {
  console.log("CORS-enabled web server listening on port ", process.env.PORT);
});

// app.listen(3002, () => {
//   console.log("Server is running...");
// });
