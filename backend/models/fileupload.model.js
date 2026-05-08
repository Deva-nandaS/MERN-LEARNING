const mongoose = require("mongoose");

const fileuploadSchema = new mongoose.Schema(
  {
    fileName:String,
    fileSize:String,
    filePath:String,
    uploadedBy:String,
    status:{
        type:String,
        default:"UPLOADED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FileUpload", fileuploadSchema);