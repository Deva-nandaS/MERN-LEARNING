const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  authType: { type: String },
  status: { type: String, default: "PENDING" },
  updatedBy: { type: String },

  // postgres
  host: String,
  database: String,
  user: String,
  password: String,
  port: String,
  sslCert: String,
  sslKey: String,

  // snowflake
  account: String,
  warehouse: String,
  role: String,
  privateKey: String,
  privateKeyPassphrase: String,

  // bigquery
  projectId: String,
  dataset: String,
  location: String,
  serviceAccountJson: String,

}, { timestamps: true });

module.exports = mongoose.model("Platform", platformSchema);


