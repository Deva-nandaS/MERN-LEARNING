const Platform = require("../models/Platform.model");
const { encrypt, decrypt } = require("../utils/encrypt");
const sensitiveFields = [
  "password",
  "privateKey",
  "privateKeyPassphrase",
  "sslCert",
  "sslKey",
  "serviceAccountJson",
];

exports.create = async (req, res) => {
  try {
    // clean empty strings
    const cleaned = Object.fromEntries(
      Object.entries(req.body).filter(([_, v]) => v !== "")
    );

    // encrypt sensitive fields
    sensitiveFields.forEach((field) => {
      if (cleaned[field]) {
        cleaned[field] = encrypt(cleaned[field]);
      }
    });

    const newPlatform = new Platform(cleaned);
    await newPlatform.save();

    res.status(201).json({
      message: "Saved successfully",
      data: newPlatform,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const cleaned = Object.fromEntries(
      Object.entries(req.body).filter(([_, v]) => v !== "")
    );

    // encrypt sensitive fields
    sensitiveFields.forEach((field) => {
      if (cleaned[field]) {
        cleaned[field] = encrypt(cleaned[field]);
      }
    });

    const updated = await Platform.findByIdAndUpdate(
      req.params.id,
      cleaned,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Platform not found" });
    }

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Platform.find();

    // decrypt sensitive fields before sending to frontend
    const decrypted = data.map((item) => {
      const obj = item.toObject();
      sensitiveFields.forEach((field) => {
        if (obj[field]) {
          obj[field] = decrypt(obj[field]);
        }
      });
      return obj;
    });

    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Platform.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Platform not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};