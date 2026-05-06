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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Shopify.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Source not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const payload = {
      ...req.body,
      startDate: req.body.startDate
        ? new Date(req.body.startDate)
        : undefined,
    };

    const updated = await Shopify.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Source not found" });
    }

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;