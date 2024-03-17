const express = require("express");
const { body, param, query } = require("express-validator");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const validateRequest = require("../middleware/validateRequest");
const isValidObjectIdValidator = require("../utils/isValidObjectIdValidator");
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
      .custom(array => array.every(id => !mongoose.Types.ObjectId.isValid(id)))
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
      .custom(array => array.every(id => mongoose.Types.ObjectId.isValid(id._id)))
      .withMessage("Each author ID must be a valid MongoDB ObjectId"),
    body("categories", "Invalid array of category ID's").optional().isArray({ min: 0 })
      .optional()
      .isArray()
      .withMessage("Categories must be an array")
      .custom((array) => array.every(cat => typeof cat === 'object' && mongoose.Types.ObjectId.isValid(cat._id) && typeof cat.name === 'string'))
      .withMessage("Each category must be an object with a valid '_id' and a 'name'"),
    param("songID")
      .custom(isValidObjectIdValidator)
      .withMessage("Invalid song ID")
  ],
  validateRequest,
  editSong
);

router.get("/all", [
    query("authorID")
      .optional()
      .custom(isValidObjectIdValidator)
      .withMessage("Invalid author ID"),
    query("categoryID")
      .optional()
      .custom(isValidObjectIdValidator)
      .withMessage("Invalid category ID"),
  ],
  validateRequest,
  getSongs
);

router.get("/random", getRandomSong);

router.get("/most-liked/:count", getMostLikedSongs);

router.post("/:songID/like",
  validateToken,  [
    param("songID").custom(isValidObjectIdValidator).withMessage("Invalid song ID")
  ],
  validateRequest,
  likeSong
);

router.delete("/:songID/delete",   
  validateToken,  [
    param("songID").custom(isValidObjectIdValidator).withMessage("Invalid song ID")
  ],
  validateRequest, 
  deleteSong
);

module.exports = router;
