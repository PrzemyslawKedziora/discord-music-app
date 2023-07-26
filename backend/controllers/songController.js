const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Song = require("../models/songModel");

//@desc Adds new song
//@route POST api/songs/add
//@access private
const addSong = asyncHandler(async (req, res) => {
  const { name, ytURL, authorID, categories } = req.body;

  // <---- Checking if user sent all necessary fields ---->
  if (!name || !ytURL || !authorID) {
    res.status(400);
    throw new Error("You need to fulfill all fields!");
  }

  // <---- Checking if user with given YouTube URL exists ---->
  const existingSong = await Song.findOne({ ytURL });
  if (existingSong) {
    res.status(400);
    throw new Error("Song with this YouTube URL already exists!");
  }

  let newCategories;
  if (categories && categories.length > 0) {
   newCategories = categories;
  } else {
    newCategories = [];
  }
  // <---- Creating new song ---->
  const newSong = {
    name,
    userID: req.user.id,
    ytURL,
    authorID,
    categories: newCategories,
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

//@desc Edits an existing song
//@route GET api/songs/edit/:songID
//@access private
const editSong = asyncHandler(async (req, res) => {
  const songID = req.params.songID;
  const { name, ytURL, authorID, categories } = req.body;

  // <---- Finding a song with ID fiven i params ---->
  const song = await Song.findById(songID);
  if (!song) {
    req.status(400);
    throw new Error("There is no song with this ID!");
  }

  // <---- Checking if user have permission to modify this song ---->
  if (!req.user.id == song.userID) {
    req.status(401);
    throw new Error("You don't have permission to edit this song!");
  }

    // <---- Updating the song with the new data ---->
    song.name = name;
    song.ytURL = ytURL;
    song.authorID = authorID;

  // Clearing the existing categories and adding the new ones
  if (categories && categories.length > 0) {
    song.categories = categories;
  } else {
    song.categories = [];

  // <---- Saving the updated song in the database ---->
  const updatedSong = await song.save();

  // <---- Sending the updated song as a response ---->
  res.status(200).json(updatedSong);
}
});


//@desc Sending list of all songs
//@route GET api/songs/all
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
//@route POST api/songs/author/:authorID
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
//@route GET api/songs/random
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

const postLikeSong = asyncHandler(async (req, res) => {
  
});

//@desc Likes a song
//@route GET api/songs/:songID/like
//@access public
const likeSong = asyncHandler(async (req, res) => {
  const songID = req.params.songID;

  // <---- Checking if the provided song id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(songID)) {
    res.status(400);
    throw new Error("Invalid song");
  }

  // <---- Finding the song in the database ---->
  const song = await Song.findById(songID);

  if (!song) {
    res.status(500);
    throw new Error(
      "There was a problem trying to get a song object from the database!"
    );
  }

  // <---- Placing/taking like (current user ID) into/from song's likes array ---->
  if (!song.likes.includes(req.user.id)) {
    await song.updateOne({ $push: { likes: req.user.id }});
    res.status(200).json({ message: "The song has been liked! "})
  } else {
    await song.updateOne({ $pull: { likes: req.user.id } });
    res.status(200).json({ message: "The song has been disliked!"});
  }
});

module.exports = {
  addSong,
  getAllSongs,
  getRandomSong,
  getSongsByAuthor,
  getSongsByCategory,
  editSong,
  likeSong
};
