const mongoose = require("mongoose");

const MarketTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});

const MarketType = mongoose.model("MarketType", MarketTypeSchema);

module.exports = MarketType;
