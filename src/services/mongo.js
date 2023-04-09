const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB is ready!");
});

async function connectMongo() {
  await mongoose.connect(MONGO_URL);
}

module.exports = { connectMongo };
