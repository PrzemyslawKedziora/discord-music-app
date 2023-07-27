const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the artist name!"],
            max: 50,
        },
        pictureURl: {
            type: String,
            required: false,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);