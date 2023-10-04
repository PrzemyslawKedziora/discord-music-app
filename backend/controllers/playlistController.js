const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Playlist = require("../models/playlistModel");
const Song = require("../models/songModel");
const { all } = require("axios");
const ObjectId = mongoose.Types.ObjectId;

//@desc Adds a new playlist
//@route POST api/playlists/add
//@access private
const addPlaylist = asyncHandler(async (req, res) => {
  const { name, songs, pictureURL } = req.body;

  // <---- Checking playlist's name has been provided ---->
  if (!name) {
    res.status(400).json({ message: "You need prive the playlist's name!" });
  }

  // <---- Checking if user with given YouTube URL exists ---->
  const existingPlaylist = await Playlist.findOne({ name });
  if (existingPlaylist) {
    res
      .status(400)
      .json({ message: "Playlist with this name already exists!" });
  }

  // <---- Checking if array with song's IDs' have been provided ---->
  let newSongs;
  if (songs && songs.length > 0) {
    newSongs = songs;
  } else {
    newSongs = [];
  }

  // <---- Creating newPlaylist Object and saving it in the dataBase ---->
  const newPlaylist = {
    name,
    newSongs,
    authorID: new mongoose.Types.ObjectId(req.user.id),
    pictureURL,
  };

  const playlist = await Playlist.create(newPlaylist);
  if (playlist) {
    res.status(201).json(playlist);
  } else {
    console.log("New playlist couldn't be saved in the dataBase");
    res.status(400).json({ message: "Playlist data was not valid!" });
  }
});

//@desc Adds a new playlist
//@route POST api/playlists/edit/:playlistID
//@access private
editPlaylist = asyncHandler(async (req, res) => {
  const playlistID = req.params.playlistID;
  const { name, songs, authorID, pictureURL } = req.body;

  const playlist = await Playlist.findById(playlistID);
  if (!playlist) {
    res
      .status(400)
      .json({ message: "Playlist with this ID not found in the dataBase" });
  }

  // <---- Checking if user have permission to modify this playlist ---->
  if (req.user.id != playlist.authorID) {
    res
      .status(403)
      .json({ message: "You don't have permission to edit this playlist" });
  }

  //<---- Updating and saving playlist ---->
  playlist.name = name;
  playlist.songs = songs;
  playlist.pictureURL = pictureURL;
  const saved = await playlist.save();
  res.status(200).json({ message: "Playlist successfully updated" });
});

//@desc Adds a new playlist
//@route POST api/playlists/:playlistID/delete
//@access private
const deletePlaylist = asyncHandler(async (req, res) => {
  const playlistID = req.params.playlistID;

  if (!ObjectId.isValid(playlistID)) {
    res.status(400).json({ message: "Not valid playlistID" });
  }

  const playlist = await Playlist.findById(playlistID);
  if (!playlist) {
    res
      .status(400)
      .json({ message: "Playlist with this ID not found in the dataBase" });
  }

  // <---- Checking if user have permission to delete this playlist ---->
  if (req.user.id != playlist.authorID) {
    res
      .status(403)
      .json({ message: "You don't have permission to delete this playlist" });
  }

  const response = await Playlist.findByIdAndDelete(playlistID);
  if (!response) {
    res
      .status(400)
      .json({ message: "Error while trying to delete playlist from dataBase" });
  }
  await playlist.deleteOne();
  res.status(200).json({ message: "Playlist successfully deleted" });
});

//@desc sends every playlist
//@route GET api/playlists/all
//@access private
const getAllPlaylists = asyncHandler(async (req, res) => {
  const allPlaylists = await Playlist.find().populate("authorID", "username");

  if (!allPlaylists) {
    res.status(400).json({
      message: "There was a problem trying to get playlists from the database",
    });
  }

  res.status(200).json(allPlaylists);
});

//@desc sends a playlist whole data
//@route GET api/playlists/:playlistID/info
//@access private
const getPlaylist = asyncHandler(async (req, res) => {
  const playlistID = req.params.playlistID;

  // <---- Checking if the provided playlist id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(playlistID)) {
    res.status(400).json({ message: "Invalid playlist ID!" });
  }

  const playlist = await Playlist.findById(playlistID)
    .populate("songs")
    .populate("authorID", "name")
    .populate({
      path: "songs",
      populate: [
        {
          path: "authors",
          model: "Author",
          select: "name",
        },
        {
          path: "categories",
          model: "Category",
          select: "name",
        },
      ],
    });

  if (!playlist) {
    res.status(500).json({
      message:
        "There was a problem trying to get the playlist object from the database!",
    });
  }

  res.status(200).json(playlist);
});

//@desc sends a playlist whole data
//@route GET api/playlists/:playlistID/add-song
//@access private
const addSongToPlaylist = asyncHandler(async (req, res) => {
  const { songID } = req.body;
  const { playlistID } = req.params;

  // <---- Checking if the provided playlist id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(playlistID)) {
    res.status(400).json({ message: "Invalid playlist ID!" });
  }
  // <---- Checking if the provided song id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(songID)) {
    res.status(400).json({ message: "Invalid song ID!" });
  }
  // <---- Checking if playlist with provided playlist ID exists ---->
  const playlist = await Playlist.findById(playlistID);
  if (!playlist) {
    res
      .status(400)
      .json({ message: "Playlist with this ID not found in the dataBase" });
  }

  if(playlist.songs.includes(songID)) {
    res.status(400)
    .json({ message: "The playlist already contains this song!"})
  };

  // <---- Checking if song with provided song ID exists ---->
  const song = await Song.findById(songID);
  if (!song) {
    res
      .status(400)
      .json({ message: "Song with this ID not found in the dataBase" });
  }

  console.log(req.user)
  console.log(playlist)
  // <---- Checking if user have permission to modify this playlist ---->
  if (req.user.id.toString() !== playlist.authorID.toString()) {
    res
      .status(401)
      .json({ message: "You don't have permission to edit this playlist!" });
    throw new Error("You don't have permission to edit this song!");
  }

  playlist.songs.push(songID.toString())
  const saved = await playlist.save();
  res.status(200).json({ message: "Succesfully added song to a playlist"})

});

module.exports = {
  addPlaylist,
  editPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylist,
  addSongToPlaylist,
};
