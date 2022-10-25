// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const morgan = require("morgan");
// require("dotenv").config();
// require("dotenv/config");

// // import routes
// const productsRoute = require("./routes/products");
// const ordersRoute = require("./routes/orders");

// // cors
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
// };

// // middlewares
// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(morgan("tiny"));

// app.listen(5000, () => {
//   console.log("Server started on PORT : ", 5000);
// });
// app.use("/products", productsRoute);
// app.use("/orders", ordersRoute);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// mongoose.connect(process.env.DB_CONNECTION, () => {
//   console.log("connected to db");
// });

// // app.listen(app.listen(process.env.PORT || 3000));
// app.listen(app.listen(5000));
