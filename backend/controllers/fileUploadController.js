const User = require("../models/User");
const fileupload = require("../models/fileupload.model");

exports.create = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files received" });
    }

    const user = await User.findById(req.user.userId);

    
    const savedFiles = await Promise.all(
      req.files.map(async (f) => {
        return await fileupload.create({
          sourceName: req.body.sourceName,
          fileName: f.originalname,
          fileSize: (f.size / 1024).toFixed(1) + " KB",
          filePath: f.path,
          uploadedBy: user?.email || req.user.userId,
        });
      })
    );

    return res.status(201).json({
      message: "Uploaded successfully",
      data: savedFiles,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await fileupload.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};