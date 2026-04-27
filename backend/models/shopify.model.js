const mongoose = require("mongoose");

const shopifySchema = new mongoose.Schema(
  {
    sourceName: String,     
    method: String,
    token: String,
    storeUrl: String,       
    syncType: String,
    startDate: {
  type: Date,
  default: () => new Date("2024-01-01")
}   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shopify", shopifySchema);