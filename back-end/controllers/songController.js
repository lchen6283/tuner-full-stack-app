const express = require("express");
const songs = express.Router();
// const db = require("../db/dbConfig");
const {
  getAllSongs,
  getASong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/songs");

const {
  checkBoolean,
  checkName,
  checkForNoAdditionalParams,
} = require("../validations/checkSongs");

//Index
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  console.log(allSongs);
  res.json(allSongs);
});

//Individual
songs.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const song = await getASong(id);
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
  const newSongs = await createSong(newSong);
  res.status(200).json(newSongs);
});

//Delete
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong) {
    if (deletedSong.id) {
      res.status(200).json(deletedSong);
    } else {
      res.status(404).json({ error: "Song not found" });
    }
  } else {
    console.error(deletedSong);
    res.status(500).json({ error: "server error" });
  }
});

//Update
songs.put(
  "/:id",
  checkBoolean,
  checkName,
  checkForNoAdditionalParams,
  async (req, res) => {
    try {
      const song = await updateSong(req.params.id, req.body);
      res.json(song);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

module.exports = songs;
