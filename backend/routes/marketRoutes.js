const express = require("express");
const marketModel = require("../models/market");
const app = express();

app.get("/markets", async (request, response) => {
  const markets = await marketModel.find({});

  try {
    response.send(markets);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...

app.post("/market", async (request, response) => {
  const market = new marketModel(request.body);

  try {
    await market.save();
    response.send(market);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...

app.patch("/market/:id", async (request, response) => {
  try {
    await marketModel.findByIdAndUpdate(request.params.id, request.body);
    await marketModel.save();
    console.log("market", market);
    response.send(market);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/market/:id", async (request, response) => {
  try {
    const market = await marketModel.findByIdAndDelete(request.params.id);

    if (!market) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
