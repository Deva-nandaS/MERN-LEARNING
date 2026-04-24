const mongoose = require("mongoose");

const shopifySchema = new mongoose.Schema(
  {
    method: String,
    token: String,
    storeName: String,
    storeUrl: String,
    syncType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shopify", shopifySchema);