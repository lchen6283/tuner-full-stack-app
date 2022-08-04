const express = require("express");
const songs = express.Router();
const db = require("../db/dbConfig");

//Index
songs.get("/", async (req, res) => {
  const allSongs = await db.any("SELECT * FROM songs");
  console.log(allSongs);
  res.json(allSongs);
});

//Individual
songs.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const song = await db.one("SELECT * FROM songs WHERE id=$1", id);
  if (song) {
    res.status(200).json(song);
  } else {
    res.status(404).send("Nothing here!");
  }
});

//Create
songs.post("/new", async (req, res) => {
  const newSong = req.body;
  console.log(newSong);
  const newSongs = await db.any(
    "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      req.body.name,
      req.body.artist,
      req.body.album,
      req.body.time,
      req.body.is_favorite,
    ]
  );
  res.status(200).json(newSongs);
});

module.exports = songs;
