const router = require("express").Router();

const { body, param, query } = require("express-validator");
const validateToken = require("../middleware/validateTokenHandler");
const validateRequest = require("../middleware/validateRequest");
const isValidObjectIdValidator = require("../utils/isValidObjectIdValidator");

const {
    addPlaylist,
    editPlaylist,
    deletePlaylist,
    getAllPlaylists,
    getPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
} = require('../controllers/playlistController');

router.get("/all", getAllPlaylists);

router.post("/add", 
    validateToken, [
        body("name", "Invalid name").notEmpty().isString().isLength({ min: 1 }),
        body("pictureURL", "Invalid pictureURL").optional().isURL()
    ], 
    validateRequest, 
    addPlaylist
);

router.post("/edit/:playlistID", 
    validateToken, [
        body("name", "Invalid name").optional().isString().isLength({ min: 1 }),
        body("songs", "Invalid songs array")
            .optional()
            .isArray({min: 0})
            .withMessage("authors must be an array of ID's")
            .custom(array => array.every(id => mongoose.Types.ObjectId.isValid(id)))
            .withMessage("Each author ID must be a valid MongoDB ObjectId"),
        body("pictureURL", "Invalid pictureURL").optional().isURL(),
        param("playlistID").custom(isValidObjectIdValidator).withMessage("Invalid playlist ID")
    ],
    editPlaylist
);

router.delete("/:playlistID/delete", 
    validateToken, [
        param("playlistID").custom(isValidObjectIdValidator).withMessage("Invalid playlist ID")
    ],
    validateRequest,
    deletePlaylist
);

router.post("/:playlistID/add-song", 
    validateToken,  [
        param("playlistID").custom(isValidObjectIdValidator).withMessage("Invalid playlist ID"),
        body("songID").custom(isValidObjectIdValidator).withMessage("Invalid song ID"),
    ],
    validateRequest, 
    addSongToPlaylist
);

router.get("/:playlistID/info", getPlaylist);

router.post("/:playlistID/remove-song", 
    validateToken,   [
        param("playlistID").custom(isValidObjectIdValidator).withMessage("Invalid playlist ID"),
        body("songID").custom(isValidObjectIdValidator).withMessage("Invalid song ID"),
    ],
    validateRequest,
    removeSongFromPlaylist
);

module.exports = router;