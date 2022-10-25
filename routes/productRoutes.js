const express = require("express");
const productModel = require("../models/product");
const app = express();

app.get("/products", async (request, response) => {
  const products = await productModel.find({});

  try {
    response.send(products);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/product", async (request, response) => {
  const product = new productModel(request.body);

  try {
    await product.save();
    response.send(product);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...

app.patch("/product/:id", async (request, response) => {
  try {
    await productModel.findByIdAndUpdate(request.params.id, request.body);
    await productModel.save();
    console.log("product", product);
    response.send(product);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/product/:id", async (request, response) => {
  try {
    const product = await productModel.findByIdAndDelete(request.params.id);

    if (!product) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
