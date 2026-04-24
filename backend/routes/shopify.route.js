const express = require("express");
const router = express.Router();
const Shopify = require("../models/shopify.model");

router.post("/", async (req, res) => {
  try {
    const newSource = new Shopify(req.body);
    await newSource.save();

    res.status(201).json({
      message: "Saved successfully",
      data: newSource,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;