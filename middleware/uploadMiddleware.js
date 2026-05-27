const multer = require("multer");
const path = require("path");
const fs = require("fs");

// render persistent disk path
const uploadPath = "/opt/render/project/src/uploads";

// create uploads folder if not exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {

    // safe unique filename
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },

});

const upload = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: function (req, file, cb) {

    const allowedTypes =
      /jpeg|jpg|png|webp/;

    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(
      file.mimetype
    );

    if (extname && mimetype) {
      return cb(null, true);
    }

    cb(
      new Error(
        "Only images are allowed (jpg, jpeg, png, webp)"
      )
    );
  },

});

module.exports = upload;