const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
  addSong,
  getSongList,
  getRandomSong,
} = require("../controllers/songController");

router.post("/add", validateToken, addSong);

router.get("/list", getSongList);

router.get("/random", getRandomSong);

module.exports = router;
