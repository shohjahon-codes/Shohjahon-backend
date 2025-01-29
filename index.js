/** @format */

const jsonServer = require("json-server"); // json-server modulini ulash
const path = require("path"); // Fayl yo'lini boshqarish uchun path moduli
const server = jsonServer.create(); // Yangi server yaratish
const router = jsonServer.router(path.join(__dirname, "db.json")); // db.json faylini o‘qish
const middlewares = jsonServer.defaults(); // Standart middleware-larni ulash
const port = process.env.PORT || 3000; // Portni aniqlash

// Middleware'larni ulash
server.use(middlewares);
server.use(jsonServer.bodyParser); // JSON body parsing

// CORS (Cross-Origin Resource Sharing) muammolarini hal qilish
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
    "/api/*": "/$1", // /api/* ni /$1 ga o‘zgartirish
  })
);

server.use(router); // Routerni ulash

server.listen(port, () => {
  console.log(`✅ JSON Server ishlayapti: http://localhost:${port}`);
});
