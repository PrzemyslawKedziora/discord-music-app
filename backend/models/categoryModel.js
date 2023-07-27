const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
