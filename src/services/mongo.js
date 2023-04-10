const mongoose = require("mongoose");

const keys = require("../config/keys");
const { database } = keys;
const databaseUrl = database.url;

mongoose.connection.once("open", () => {
  console.log("MongoDB is ready!");
});

async function connectMongo() {
  await mongoose.connect(databaseUrl);
}

module.exports = { connectMongo };
