const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative prices aren't real.");
    },
  },
  productId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  marketId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Price = mongoose.model("Price", PriceSchema);

module.exports = Price;
