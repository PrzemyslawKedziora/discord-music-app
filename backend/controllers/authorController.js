const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");

//@desc Adds an author 
//@route POST api/authors/add
//@access private
const addAuthor = asyncHandler (async (req, res) => {

    const { name, pictureURL } = req.body;

    // <---- Checking if user sent all necessary fields ---->
    if (!name) {
        res.status(400);
        throw new Error("You need to provide author's name!");
    }

    // <---- Checking if author with given name already exists ---->
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
        res.status(400);
        throw new Error("Author with this name already exists!");
    }

    const newAuthor = {
        name,
        pictureURL,
        userID: req.user.id,
    };
    const author = await Author.create(newAuthor);
    console.log(author);

    if(author) {
        res.status(200).json(author);
    } else {
        res.status(400);
        throw new Error("author data was not valid!");
    }
});

//@desc Sending list of all authors
//@route POST api/authors/all
//@access  public
const getAllAuthors = asyncHandler(async (req, res) => {
    const authorList = await Author.find();

    if (!authorList) {
      res.status(500);
      throw new Error(
        "There was a problem trying to get authors from the database!"
      );
    } else {
      res.status(200).json(authorList);
    }
});

module.exports = {
    addAuthor,
    getAllAuthors,
};