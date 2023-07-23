const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
