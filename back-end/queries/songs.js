const db = require("../db/dbConfig");

//GET ALL
const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

//GET INDIVIDUAL
const getASong = async (id) => {
  try {
    const song = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return song;
  } catch (error) {
    return error;
  }
};

//CREATE
const createSong = async ({ name, artist, album, time, is_favorite }) => {
  try {
    const newSongs = await db.any(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, artist, album, time, is_favorite]
    );
    return newSongs;
  } catch (error) {
    return error;
  }
};

//DELETE
const deleteSong = async (id) => {
  try {
    const oneSong = await db.one(
      "DELETE FROM songs WHERE id=$1 RETURNING *",
      id
    );
    return oneSong;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

//UPDATE
const updateSong = async (
  id,
  { name, artist, album, time, is_favorite, ...otherStuff }
) => {
  console.log(id, name, artist, album, time, is_favorite, otherStuff);
  try {
    const updateSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 where id=$6 RETURNING *",
      [name, artist, album, time, is_favorite, id]
    );
    return updateSong;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

module.exports = {
  getAllSongs,
  getASong,
  createSong,
  deleteSong,
  updateSong,
};
