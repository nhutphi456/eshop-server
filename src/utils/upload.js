const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let fileTypeError = new Error("Invalid image type");
    if (isValid) {
      fileTypeError = null;
    }
    cb(fileTypeError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const sku = req.body.sku;
    const fileName = sku.split(" ").join("-").toLowerCase();
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, fileName + "-" + Date.now() + `.${extension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
