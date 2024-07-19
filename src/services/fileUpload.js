const path = require("node:path");
const crypto = require("node:crypto");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../public/poster");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const randomString = crypto.randomBytes(6).toString("hex");
    const extension = path.extname(file.originalname);
    const poster = "poster-" + randomString + extension;
    cb(null, poster);
  },
});

const fileUpload = multer({ storage });
module.exports = fileUpload;
