const express = require("express");
const marketTypeModel = require("../models/marketType");
const app = express();

app.get("/marketTypes", async (request, response) => {
  const marketTypes = await marketTypeModel.find({});

  try {
    response.send(marketTypes);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...

app.post("/marketType", async (request, response) => {
  const marketType = new marketTypeModel(request.body);

  try {
    await marketType.save();
    response.send(marketType);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...

app.patch("/marketType/:id", async (request, response) => {
  try {
    await marketTypeModel.findByIdAndUpdate(request.params.id, request.body);
    await marketTypeModel.save();
    console.log("marketType", marketType);
    response.send(marketType);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/marketType/:id", async (request, response) => {
  try {
    const marketType = await marketTypeModel.findByIdAndDelete(
      request.params.id
    );

    if (!marketType) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
