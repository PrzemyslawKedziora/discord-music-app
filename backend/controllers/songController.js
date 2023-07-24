const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Song = require("../models/songModel");

//@desc Adds new song
//@route POST api/song/add
//@access private
const addSong = asyncHandler(async (req, res) => {
  const { name, ytURL, author } = req.body;

  // <---- Checking if user sent all necessary fields ---->
  // author - object { name, authorID}
  if (!name || !ytURL || !author.name || !author.authorID) {
    res.status(400);
    throw new Error("You need to fulfill all fields!");
  }

  // <---- Checking if user with given YouTube URL exists ---->
  const existingSong = await Song.findOne({ ytURL });
  if (existingSong) {
    res.status(400);
    throw new Error("Song with this YouTube URL already exists!");
  }

  // <---- Creating new song ---->
  const newSong = {
    name,
    user: { userID: req.user.id, username: req.user.username },
    ytURL,
    author: { name: author.name, authorID: author.authorID},
    likes: [],
  };
  const song = await Song.create(newSong);

  if (song) {
    console.log("New song created! ", song);
    res.status(201).json(song);
  } else {
    res.status(400);
    throw new Error("Song data was not valid!");
  }
});

//@desc Sending list of all songs
//@route GET api/song/all
//@access public
const getAllSongs = asyncHandler(async (req, res) => {
  const songList = await Song.find();

  if (!songList) {
    res.status(500);
    throw new Error(
      "There was a problem trying to get Songs from the database!"
    );
  } else {
    res.status(200).json(songList);
  }
});

//@desc sending list of all song of given author
//@route POST api/song/author/:authorID
//@access public
const getSongsByAuthor = asyncHandler(async (req, res) => {
  const authorID = req.params.authorID;

  // <---- Checking if the provided author id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(authorID)) {
    res.status(400);
    throw new Error("Invalid author");
  }

  // <---- Finding songs by the provided authorId ---->
  const songs = await Song.find({ 'author.authorID' : authorID }).exec();

  if (songs.length > 0) {
    res.status(200).json(songs);
  } else {
    res.status(404);
    throw new Error("No songs with this author found!");
  }
});

//@desc sending list of all song of given category
//@route POST api/song/category/:categoryID
//@access public
const getSongsByCategory = asyncHandler(async (req, res) => {
  const categoryID = req.params.categoryID;

  // <---- Checking if the provided category id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    res.status(400);
    throw new Error("Invalid category");
  }

  // <---- Finding songs by the provided categoryID ---->
  const songs = await Song.find({ categories: { $in: [categoryID] } }).exec();

  if (songs.length > 0) {
    res.status(200).json(songs);
  } else {
    res.status(404);
    throw new Error("No songs with this author found!");
  }

});

//@desc Sending a random song
//@route GET api/song/random
//@access public
const getRandomSong = asyncHandler( async(req, res) => {
  const randomSong = await Song.aggregate([{ $sample: { size: 1 } }]).exec();

  if (!randomSong) {
    res.status(500);
    throw new Error(
      "There was a problem trying to get a Song from the database!"
    );
  } else {
    res.status(200).json(randomSong);
  }
});



module.exports = {
  addSong,
  getAllSongs,
  getRandomSong,
  getSongsByAuthor,
  getSongsByCategory,
};
