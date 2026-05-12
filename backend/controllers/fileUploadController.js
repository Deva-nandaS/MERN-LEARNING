const fileupload=require("../models/fileupload.model")

exports.create = async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("USER:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files received" });
    }

    const savedFiles = await Promise.all(
      req.files.map(async (f) => {
        return await fileupload.create({
          fileName: f.originalname,
          fileSize: (f.size / 1024).toFixed(1) + " KB",
          filePath: f.path,
          uploadedBy: req.user.email,
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

