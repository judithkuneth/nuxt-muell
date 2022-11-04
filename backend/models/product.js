const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  unit: String,
});

module.exports = mongoose.model("Product", ProductSchema);
