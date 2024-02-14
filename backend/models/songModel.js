const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add music name!"],
      max: 200,
    },
    // User who uploaded this music piece
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ytURL: {
      type: String,
      required: [true, "Please add YouTube URL"],
      unique: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    authors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    }],
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
