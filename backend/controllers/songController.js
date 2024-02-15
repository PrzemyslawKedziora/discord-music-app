const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Song = require("../models/songModel");
const Playlist = require("../models/playlistModel");
const getVideoData = require("../APIs/getVideoData");
const sendResponse = require("../utils/sendResponse");

/**
 * @desc Adds new song
 * @route POST api/songs/add
 * @access private
 */
const addSong = asyncHandler(async (req, res) => {
  const { ytURL, authors, categories } = req.body;

  // <---- Checking if user with given YouTube URL exists ---->
  const existingSong = await Song.findOne({ ytURL });
  if (existingSong) {
    return sendResponse(res, 409, false, {}, "Song with this YouTube URL already exists");
  }

  // <---- Checking if user send any categories and maping them to string(id) array ---->
  let newCategories;
  if (categories) {
      newCategories = categories.map((category) => category._id);
  } else {
    newCategories = [];
  }

  // <---- Using YouTube API to get thumbnail in Base64 format ---->
  const songData = await getVideoData(ytURL);

  const newSong = {
    name: songData.name,
    userID: req.user.id,
    ytURL,
    thumbnail: songData.thumbnail,
    authors,
    categories: newCategories,
    likes: [],
  };

  try {
    const song = await Song.create(newSong);
    return sendResponse(res, 201, true, song, "");
  } catch (error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Edits an existing song, only author and categories
 * @route GET api/songs/edit/:songID
 * @access private
 **/
const editSong = asyncHandler(async (req, res) => {
  const songID = req.params.songID;
  const { authors, categories } = req.body;

  // <---- Finding a song with ID fiven i params ---->
  const song = await Song.findById(songID);
  if (!song) {
    return sendResponse(res, 400, false, {}, "Cannot find song with provided ID");
  }

  // <---- Checking if user have permission to modify this song ---->
  if (req.user.id.toString() !== song.userID.toString()) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to modify another user's song.");
  }

  // <---- Updating the song with the new data ---->
  song.authors = authors;
  if (categories) {
    song.categories = categories;
  }

  try {
    const updatedSong = await song.save();
    res.status(200).json(updatedSong);
  } catch (error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Sending list of all songs
 * @route GET api/songs/all
 * @access public
 **/
const getSongs = asyncHandler(async (req, res) => {
  const { authorID, categoryID } = req.query;
  let filter = {};

  // Dodajemy filtr dla authorID, jeśli jest dostarczony i jest ważnym ID
  if (authorID && mongoose.Types.ObjectId.isValid(authorID)) {
    filter.authors = { $in: [authorID] };
  }
  // Dodajemy filtr dla categoryID, jeśli jest dostarczony i jest ważnym ID
  if (categoryID && mongoose.Types.ObjectId.isValid(categoryID)) {
    filter.categories = { $in: [categoryID] };
  }

  try {
    const songList = await Song.find(filter)
    .populate("userID", "username")
    .populate("authors", "name")
    .populate("categories", "name");

    return sendResponse(res, 200, true, songList, "");
  } catch (error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc sending list of all song of given category
 * @route GET api/song/most-liked/:count
 * @access public
 **/
const getMostLikedSongs = asyncHandler(async (req, res) => {
  const count = parseInt(req.params.count);

  // make sure count is a valid number
  if (isNaN(count) || count < 0) {
    return sendResponse(res, 400, false, {}, "Invalid count parameter");
  }

  // Get all the songs and sort them by descending number of likes with the limit of 'count'
  try {
    const songs = await Song.find()
      .sort({ 'likes.length': -1 }) // Sortowanie po długości tablicy 'likes' w porządku malejącym
      .limit(count) // Ograniczenie liczby wyników do 'count'
      .populate("userID", "username")
      .populate("authors", "name")
      .populate("categories", "name");
    return sendResponse(res, 200, true, songs, "");
  } catch (error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Sending a random song
 * @route GET api/songs/random
 * @access public
 **/
const getRandomSong = asyncHandler(async (req, res) => {
  try {
    const count = await Song.countDocuments(); // Krok 1: Pobierz liczbę wszystkich piosenek
    const random = Math.floor(Math.random() * count); // Krok 2: Wygeneruj losowy indeks
    const song = await Song.findOne() // Krok 3: Pobierz losową piosenkę
                           .skip(random)
                           .populate("userID", "_id username") // Krok 4: Populate userID
                           .populate("authors", "_id name") // Możesz dodać więcej pól do populacji
                           .populate("categories", "_id name");
    if (song) {
      sendResponse(res, 200, true, song, "");
    } else {
      sendResponse(res, 404, false, {}, "No songs found");
    }
  } catch (error) {
    sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Likes a song
 * @route POST api/songs/:songID/like
 * @access private
 **/
const likeSong = asyncHandler(async (req, res) => {
  const songID = req.params.songID;

  const song = await Song.findById(songID);
  if(!song) {
    return sendResponse(res, 400, false, {}, "Cannot find song with provided ID");
  }

  // <---- Placing/taking like (current user ID) into/from song's likes array ---->
  const userLiked = song.likes.includes(req.user.id);
  const update = userLiked
    ? { $pull: { likes: req.user.id } }
    : { $push: { likes: req.user.id } };

  try {
    const updatedSong = await Song.findOneAndUpdate(
      { _id: songID }, 
      update, 
      { new: true,}
    );
    return sendResponse(res, 200, true, updatedSong, "");
  } catch (error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc deletes a song
 * @route DELETE api/songs/:songID/delete
 * @access private
 **/
const deleteSong = asyncHandler(async (req, res) => {
  const songID = req.params.songID;

  // <---- Finding the song in the database ---->
  const song = await Song.findById(songID);
  if (!song) {
    return sendResponse(res, 400, false, {}, "Cannot find song with provided ID");
  }

  // <---- Checking if the current user is the song's creator ---->
  if (song.userID.toString() !== req.user.id.toString()) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to modify another user's songs.");
  }

  // <---- Deleting this song from every playlist ---->
  const deleteSongsFromPlaylists = async (songID) => {
    const filter = { songs: { $in: [songID] } };
    const update = { $pull: { songs: songID } };
    return await Playlist.updateMany(filter, update);
  };

  try {
    const response = await deleteSongsFromPlaylists(song._id);
    await song.deleteOne();
    return sendResponse(res, 200, true, {
      message: `Song deleted, updated ${response.modifiedCount} playlists`,
      playlistsUpdated: response.modifiedCount, // number of playlists that the song ID have been deleted from
    }, "");
  } catch (error) {
    return sendResponse(res, 400, false, {}, "Failed to delete song from all playlist");
  }
});

module.exports = {
  addSong,
  getSongs,
  getRandomSong,
  getMostLikedSongs,
  editSong,
  likeSong,
  deleteSong,
};
