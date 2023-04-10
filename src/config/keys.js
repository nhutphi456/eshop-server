module.exports = {
  app: {
    apiURL: process.env.API_URL,
  },
  port: process.env.PORT,
  database: {
    url: process.env.MONGO_URL
  },
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  }
};
