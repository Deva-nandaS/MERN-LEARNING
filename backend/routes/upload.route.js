const express = require("express");
const router = express.Router();
const multer = require("multer");
const FileUpload = require("../models/fileupload.model");
const authMiddleware = require("../middleware/authMiddleware");
const { create,get } = require("../controllers/fileUploadController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("FILE NAME:", file.originalname);
  console.log("MIME TYPE:", file.mimetype);

  const mime = (file.mimetype || "").toLowerCase();


  const allowedMimeTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const allowedExtensions = [".csv",".xlsx", ".xls"];

  const fileName = file.originalname.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));

  const isMimeValid = allowedMimeTypes.includes(mime);
  const isExtensionValid = allowedExtensions.includes(fileExtension);

  if (isMimeValid || isExtensionValid) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Unsupported file type. Allowed: CSV, JSON, PDF, Images, Excel files"
    ),
    false
  );
};
const upload = multer({ storage, fileFilter });

router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    upload.array("files")(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      next();
    });
  },
  create
);

router.get("/", authMiddleware, get);

// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await FileUpload.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ message: "File not found" });
//     }
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
