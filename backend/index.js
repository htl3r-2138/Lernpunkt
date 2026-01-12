const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db = require("./db");

const authRoutes = require("./routes/auth.routes");
const subjectRoutes = require("./routes/subjects.routes");
const userRoutes = require("./routes/user.routes");

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

app.use("/api/auth", authRoutes);
app.use("/api", subjectRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend läuft!");
});

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});