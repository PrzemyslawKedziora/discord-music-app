const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema(
    {
        name: {
            type: Stringm,
            required: [true, "Please provide the playlist's name!"],
            max: 200,
        },
        songs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }],
        authorID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        pictureURL: {
            type: String,
            required: false,
        }
    }
);

module.exports = mongoose.model("Playlist", playlistSchema);