const express = require("express");
const priceModel = require("../models/price");
const app = express();

app.get("/prices", async (request, response) => {
  const prices = await priceModel.find({});

  try {
    response.send(prices);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...

app.post("/price", async (request, response) => {
  const price = new priceModel(request.body);

  try {
    await price.save();
    response.send(price);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...

app.patch("/price/:id", async (request, response) => {
  try {
    await priceModel.findByIdAndUpdate(request.params.id, request.body);
    await priceModel.save();
    console.log("price", price);
    response.send(price);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/price/:id", async (request, response) => {
  try {
    const price = await priceModel.findByIdAndDelete(request.params.id);

    if (!price) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
