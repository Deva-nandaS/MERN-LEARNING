const express = require("express");
const router = express.Router();
const Shopify = require("../models/shopify.model");

router.post("/", async (req, res) => {
  try {
    const payload = {
      ...req.body,
      startDate: req.body.startDate
        ? new Date(req.body.startDate)
        : undefined, 
    };

    const newSource = new Shopify(payload);
    await newSource.save();

    res.status(201).json({
      message: "Saved successfully",
      data: newSource,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  const data = await Shopify.find();
  res.json(data);
});


module.exports = router;