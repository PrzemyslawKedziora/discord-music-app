const asyncHandler = require("express-async-handler");
const Song = require("../models/songModel");

//@desc Adds new song
//@route POST api/song/add
//@access private
const addSong = asyncHandler(async (req, res) => {
  const { name, ytURL, author } = req.body;

  // <---- Checking if user sent all necessary fields ---->
  // author - object { name, authorID}
  if (!name || !ytURL || !author) {
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
  console.log("New song created! ", song);

  if (song) {
    res.status(201).json(song);
  } else {
    res.status(400);
    throw new Error("Song data was not valid!");
  }
});

//@desc Seding list of every Song
//@route GET api/song/list
//@access public
const getSongList = asyncHandler(async (req, res) => {
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
  getSongList,
  addSong,
  getRandomSong,
};
