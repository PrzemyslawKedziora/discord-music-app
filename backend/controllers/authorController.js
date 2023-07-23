const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");

//@desc Adds an author 
//@route POST api/authors/add
//@access private
const addAuthor = asyncHandler (async (req, res) => {

    const { name } = req.body;

    // <---- Checking if user sent all necessary fields ---->
    if (!name) {
        res.status(400);
        throw new Error("You need to provide author's name!");
    }

    const newAuthor = {
        name,
        
    };

});

module.exports = {
    addAuthor,
};