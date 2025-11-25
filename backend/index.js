const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret: "geheim",
  resave: false,
  saveUninitialized: false,
}));

app.get("/", (req, res) => {
  res.send("Backend läuft!");
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));