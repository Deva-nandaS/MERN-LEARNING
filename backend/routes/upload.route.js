const express = require("express");
const router = express.Router();
const multer = require("multer");
const FileUpload = require("../models/fileupload.model");
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "text/csv",
    "application/json",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/pdf",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV, Excel, JSON files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", authMiddleware, upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files received" });
    }

    const savedFiles = await Promise.all(
      req.files.map((f) =>
        FileUpload.create({
          fileName: f.originalname,
          fileSize: (f.size / 1024).toFixed(1) + " KB",
          fileType: f.mimetype,
          filePath: f.path,
          uploadedBy: req.user.email, // now SAFE
        }),
      ),
    );

    res.status(201).json({
      message: "Uploaded successfully",
      data: savedFiles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await FileUpload.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await FileUpload.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
