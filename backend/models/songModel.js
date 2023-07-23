const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add music name!"],
      max: 200,
    },
    // User who uploaded this music piece
    user: {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
        max: 50,
      },
    },
    ytURL: {
      type: String,
      required: [true, "Please add YouTube URL"],
      unique: true,
    },
    author: {
      name: {
        type: String,
        required: true,
        max: 50,
      },
      authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
      },
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
