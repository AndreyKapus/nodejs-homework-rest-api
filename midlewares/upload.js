const { diskStorage } = require("multer");
const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalName);
  },
  limits: {
    fileSize: 5120,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
