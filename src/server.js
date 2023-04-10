require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectMongo } = require("./services/mongo")
;
const keys = require('./config/keys')
const { port } = keys

const httpServer = http.createServer(app);

async function startServer() {
  await connectMongo();
  httpServer.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

startServer();
