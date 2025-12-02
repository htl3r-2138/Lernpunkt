const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql2/promise");

async function waitForDB(pool) {
  let connected = false;

  while (!connected) {
    try {
      await pool.query("SELECT 1");
      connected = true;
      console.log("DB connection established!");
    } catch (err) {
      console.log("DB not ready yet, retrying in 2s...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

async function startServer() {
  const db = mysql.createPool({
    host: "db",
    user: "root",
    password: "root",
    database: "LP_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  await waitForDB(db);

  const app = express();
  app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
  app.use(express.json());

  app.use(
    session({
      secret: "geheim",
      resave: false,
      saveUninitialized: false,
    })
  );

  // --- ROUTES ---

  app.get("/", (req, res) => {
    res.send("Backend läuft!");
  });
  app.get("/users", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM User;");
    res.json(rows);
  });
  app.get("/tables", async (req, res) => {
    const [rows] = await db.query("SHOW TABLES;");
    res.json(rows);
  });

  app.listen(3000, () => console.log("Server läuft auf Port 3000"));
}

startServer().catch((err) => console.error("Startup Error:", err));