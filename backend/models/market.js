const mongoose = require("mongoose");

const MarketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: false,
  },
  marketType: {
    type: Number,
    required: true,
  },
});

const Market = mongoose.model("Market", MarketSchema);

module.exports = Market;
