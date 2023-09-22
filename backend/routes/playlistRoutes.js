const router = require("express").Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
    addPlaylist,
    editPlaylist,
    deletePlaylist,
    getAllPlaylists,
    getPlaylist,
} = require('../controllers/playlistController');

router.get("/all", getAllPlaylists);

router.post("/add", validateToken, addPlaylist);

router.post("/edit/:playlistID", validateToken, editPlaylist);

router.delete("/:playlistID/delete", validateToken, deletePlaylist);

router.get("/:playlistID/info", getPlaylist);


module.exports = router;