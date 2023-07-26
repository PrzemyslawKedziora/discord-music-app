const mongoose = require("mongoose");

const musicSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [True, "Please add music name!"],
            max: 200,
        },
        author: {
            type: String,
            required: false,
            default: null
        },
        // ID of a user who uploaded this music piece
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ytURL: {
            type: String,
            required: [True, "Please add YouTube URL"],
        },
        likes: {
            type: Array,
            default: [],
          },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Music", musicSchema);