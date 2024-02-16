const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Playlist = require("../models/playlistModel");
const Song = require("../models/songModel");
const sendResponse = require("../utils/sendResponse");
const ObjectId = mongoose.Types.ObjectId;

/**
 * @desc Adds a new playlist
 * @route POST api/playlists/add
 * @access private
 */
const addPlaylist = asyncHandler(async (req, res) => {
  const { name, pictureURL } = req.body;

  // <---- Checking if playlist with given name already exists ---->
  const existingPlaylist = await Playlist.findOne({ name });
  if (existingPlaylist) {
    return sendResponse(res, 409, false, {}, "Playlist with this name already exists");
  }

  // <---- Creating newPlaylist Object and saving it in the dataBase ---->
  const newPlaylist = {
    name,
    songs: [],
    authorID: new mongoose.Types.ObjectId(req.user.id),
    pictureURL,
  };

  const playlist = await Playlist.create(newPlaylist);
  if (playlist) {
    return sendResponse(res, 201, false, playlist, "");
  } else {
    return sendResponse(res, 400, false, {}, "Couldn't save playlist")
  }
});

/**
 * @desc Edits an existing playlist
 * @route POST api/playlists/edit/:playlistID
 * @access private
 */
editPlaylist = asyncHandler(async (req, res) => {
  const playlistID = req.params.playlistID;
  const { name, songs, pictureURL } = req.body;

  const playlist = await Playlist.findById(playlistID);
  if (!playlist) {
    return sendResponse(res, 400, false, {}, "Cannot find playlist with provided ID");
  }

  // <---- Checking if user have permission to modify this playlist ---->
  if (req.user.id != playlist.authorID) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to modify another user's playlists.");
  }

  //<---- Updating and saving playlist ---->
  playlist.name = name ? name : playlist.name;
  playlist.songs = songs.length > 0 ? songs : playlist.songs;
  playlist.pictureURL = pictureURL ? pictureURL : playlist.pictureURL;
  const savedPlaylist = await playlist.save();
  if (savedPlaylist) {
    return sendResponse(res, 201, true, savedPlaylist, "");
  } else {
    return sendResponse(res, 400, false, {}, "Cannot save the playlist");
  }
});

/**
 * @desc Deletes an existing playlist
 * @route DELETE api/playlists/:playlistID/delete
 * @access private
 */
const deletePlaylist = asyncHandler(async (req, res) => {
  const playlistID = req.params.playlistID;

  const playlist = await Playlist.findById(playlistID);
  if (!playlist) {
    return sendResponse(res, 400, false, {}, "Cannot find playlist with provided ID");
  }

  // <---- Checking if user have permission to delete this playlist ---->
  if (req.user.id != playlist.authorID) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to delete another user's playlists.");
  }

  try {
    await playlist.deleteOne();
    return sendResponse(res, 204, true, {}, "");
  } catch (error) {
    return sendResponse(res, 400, false, {}, "Couldn't delete the playlist");
  }
});

/**
 * @desc Retrieves all playlists
 * @route GET api/playlists/all
 * @access private
 */
const getAllPlaylists = asyncHandler(async (req, res) => {
  try {
    const allPlaylists = await Playlist.find().populate("authorID", "username");
    return sendResponse(res, 200, true, allPlaylists, "");
  } catch (error) {
    return sendResponse(res, 400, false, {}, "Couldn't get the playlists");
  }
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
/**
 * @desc Adds a song to a playlist
 * @route POST api/playlists/:playlistID/add-song
 * @access private
 */
const addSongToPlaylist = asyncHandler(async (req, res) => {
  const { songID } = req.body;
  const { playlistID } = req.params;

  // <---- Checking if playlist with provided playlist ID exists ---->
  const playlist = await Playlist.findById(playlistID);
  if (!playlist) {
    return sendResponse(res, 400, false, {}, "Cannot find playlist with provided ID");
  }

  // <---- Checking if song with provided song ID exists ---->
  const song = await Song.findById(songID);
  if (!song) {
    return sendResponse(res, 400, false, {}, "Cannot find song with provided ID");
  }

  if(playlist.songs.includes(songID)) {
    return sendResponse(res, 400, false, {}, "This playlist already contains this song");
  };

  // <---- Checking if user have permission to modify this playlist ---->
  if (req.user.id.toString() !== playlist.authorID.toString()) {
   return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to delete another user's playlists.");
  }

  try {
    playlist.songs.push(songID.toString())
    const saved = await playlist.save();
    return sendResponse(res, 200, true, saved, "");
  } catch (error) {
    return sendResponse(res, 400, false, {}, "Couldn't save the playlist");
  }
});


/**
 * @desc Removes a song from a playlist
 * @route POST api/playlists/:playlistID/remove-song
 * @access private
 */
const removeSongFromPlaylist = asyncHandler(async(req, res) => {
  const { songID } = req.body;
  const { playlistID } = req.params;

  // <---- Checking if playlist with provided playlist ID exists ---->
  const playlist = await Playlist.findById(playlistID);
  if (!playlist) {
    return sendResponse(res, 400, false, {}, "Cannot find playlist with provided ID");
  }

  if(!playlist.songs.includes(songID)) {
    return sendResponse(res, 400, false, {}, "This playlist does not contains this song");
  };

  // <---- Checking if user have permission to modify this playlist ---->
  if (req.user.id.toString() !== playlist.authorID.toString()) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to delete another user's playlists.");
  }

  try {
    playlist.songs = playlist.songs.filter(el => el != songID);
    const saved = await playlist.save();
    return sendResponse(res, 200, true, saved, "");
  } catch (error) {
    return sendResponse(res, 400, false, {}, "Couldn't save the playlist");
  }
}); 

module.exports = {
  addPlaylist,
  editPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist
};