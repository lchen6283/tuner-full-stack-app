//Dependencies
const express = require("express");
const cors = require("cors");
const songContoller = require("./controllers/songController");

//Configuration
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/songs", songContoller);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});

app.get("*", (req, res) => {
  res.status(404).send("These are not the songs you are looking for");
});

module.exports = app;
