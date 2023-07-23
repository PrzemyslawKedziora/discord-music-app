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
    },
    { timestamps: true }
);

module.export = mongoose.model("Author", authorSchema);