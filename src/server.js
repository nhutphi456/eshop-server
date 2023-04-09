require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectMongo } = require("./services/mongo");


const PORT = process.env.PORT;

const httpServer = http.createServer(app);

async function startServer() {
  await connectMongo();
  httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
