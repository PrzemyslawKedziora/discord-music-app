const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const validateRequest = require("../middleware/validateRequest");
const mongoose = require("mongoose");

const {
  addSong,
  getSongs,
  getRandomSong,
  getMostLikedSongs,
  editSong,
  likeSong,
  deleteSong,
} = require("../controllers/songController");

router.post(
  "/add",
  validateToken, [
    body("ytURL", "Invalid ytURL").notEmpty().isURL(),
    body("authors", "Invalid authors array")
      .isArray({min: 1})
      .withMessage("authors must be an array of ID's")
      .custom(array => array.every(id => mongoose.Types.ObjectId.isValid(id)))
      .withMessage("Each author ID must be a valid MongoDB ObjectId"),
    body("categories", "Invalid array of category ID's").optional().isArray({ min: 0 })
      .optional()
      .isArray()
      .withMessage("Categories must be an array")
      .custom((array) => array.every(cat => typeof cat === 'object' && mongoose.Types.ObjectId.isValid(cat._id) && typeof cat.name === 'string'))
      .withMessage("Each category must be an object with a valid '_id' and a 'name'"),
  ],
  validateRequest,
  addSong
);

router.post("/edit/:songID", validateToken, [
    body("authors", "Invalid authors array")
      .optional()
      .isArray({min: 1})
      .withMessage("authors must be an array of ID's")
      .custom(array => array.every(id => mongoose.Types.ObjectId.isValid(id)))
      .withMessage("Each author ID must be a valid MongoDB ObjectId"),
    body("categories", "Invalid array of category ID's").optional().isArray({ min: 0 })
      .optional()
      .isArray()
      .withMessage("Categories must be an array")
      .custom((array) => array.every(cat => typeof cat === 'object' && mongoose.Types.ObjectId.isValid(cat._id) && typeof cat.name === 'string'))
      .withMessage("Each category must be an object with a valid '_id' and a 'name'"),
  ],
  validateRequest,
  editSong
);

router.get("/all", getSongs);

router.get("/random", getRandomSong);

router.get("/most-liked/:count", getMostLikedSongs);

router.post("/:songID/like", validateToken, likeSong);

router.delete("/:songID/delete", validateToken, deleteSong);

module.exports = router;
