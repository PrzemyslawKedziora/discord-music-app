const router = require("express").Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
    addPlaylist,
    editPlaylist,
    deletPlaylist,
    getAllPlaylists,
} = require('../controllers/playlistController');

router.get("/all", getAllPlaylists);

router.post("/add", validateToken, addPlaylist);

router.post("/edit/:playlistID", validateToken, editPlaylist);

router.post("/:playlistID/delete", validateToken, deletPlaylist);


module.exports = router;