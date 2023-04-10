const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const keys = require("../config/keys");
const { cloudName, apiKey, apiSecret } = keys.cloud;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["png", "jpg", "jpeg"],
    public_id: (req, file) => {
      const sku = req.body.sku;
      const fileName = sku.split(" ").join("-").toLowerCase();
      const publicId = fileName + "-" + Date.now();
      return publicId;
    },
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
