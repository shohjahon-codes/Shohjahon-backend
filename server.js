/** @format */

const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Middleware'lar
server.use(middlewares);
server.use(jsonServer.bodyParser);

// CORS muammolarini oldini olish
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// URL'larni qayta yozish
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1"
  })
);

server.use(router);

// Vercel uchun handler
module.exports = server;
