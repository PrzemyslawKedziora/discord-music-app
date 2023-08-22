const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");

//@desc Adds an author 
//@route POST api/authors/add
//@access private
const addAuthor = asyncHandler (async (req, res) => {

    const { name, pictureURL } = req.body;

    // <---- Checking if user sent all necessary fields ---->
    if (!name) {
        res.status(400).json({message: "You need to provide author's name!"});
        throw new Error("You need to provide author's name!");
    }

    // <---- Checking if author with given name already exists ---->
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
        res.status(400).json({message: "Author with this name already exists!"});
        throw new Error("Author with this name already exists!");
    }

    const newAuthor = {
        name,
        pictureURL,
        userID: req.user.id,
    };
    console.log(req.body)

    const author = await Author.create(newAuthor);
    console.log(author);

    if(author) {
        res.status(200).json(author);
    } else {
        res.status(400).json({message: "author data was not valid!"});
        throw new Error("author data was not valid!");
    }
});

//@desc Sending list of all authors
//@route POST api/authors/all
//@access  public
const getAllAuthors = asyncHandler(async (req, res) => {
    const authorList = await Author.find();

    if (!authorList) {
      res.status(500).json({message: "There was a problem trying to get authors from the database!"});
      throw new Error(
        "There was a problem trying to get authors from the database!"
      );
    } else {
      res.status(200).json(authorList);
    }
});

//@desc Edits an existing author
//@route /api/users/:authorID/edit
//@access private
const editAuthor = asyncHandler(async (req, res) => {
    const authorID = req.params.authorID;
    const { name, pictureURL } = req.body;
  
    // <---- Checking if the provided author id is valid ---->
    if (!mongoose.Types.ObjectId.isValid(authorID)) {
      res.status(400).json({message: "Invalid author ID"});
      throw new Error("Invalid author ID!");
    }
    // <---- Finding the author in the database ---->
    const author = await Author.findById(authorID);
    if (!author) {
      res.status(500).json({message: "There was a problem trying to get the author object from the database!"});
      throw new Error(
        "There was a problem trying to get the author object from the database!"
      );
    }
  
    // <---- Checking if user have permission to modify this author ---->
    if (author.userID.toString() !== req.user.id) {
      res.status(403).json({message: "You cannot change other authors' ids'!"});
      throw new Error("You cannot change other authors' ids'!");
    }
  
    // <---- Giving the author new values if they have been sent ---->
    author.name = name ? name : author.name;
    author.pictureURL = name ? name : author.name;
  
    // <---- Saving the updated category in the database ---->
    const updatedAuthor = await Author.save();
  
    // <---- Sending the category as a response ---->
    res.status(200).json(updatedAuthor);
  });

//@desc Deletes an author
//@route DELETE api/authors/:authorID/delete
//@access private
const deleteAuthor = asyncHandler(async (req, res) => {
    const authorID = req.params.authorID;
  
    // <---- Checking if the provided author id is valid ---->
    if (!mongoose.Types.ObjectId.isValid(authorID)) {
      res.status(400).json({ message: "Invalid author! ID"  });
      throw new Error("Invalid author!");
    }
  
    // <---- Finding the author in the database ---->
    const author = await Author.findById(authorID);
    if (!author) {
      res.status(500).json({ message: "There was a problem trying to get the author object from the database!"});
      throw new Error(
        "There was a problem trying to get the author object from the database!"
      );
    }
  
    // <---- Checking if the current user is the author's creator ---->
    if (author.userID.toString() !== req.user.id) {
      res.status(403).json({ message: "You cannot delete author that was not added by you!"});
      throw new Error("You cannot delete author that was not added by you!");
    }
  
    // <---- Deleting song and sending the response ---->
    await author.deleteOne();
    res.status(200).json({ message: "Author deleted!" });
  });

module.exports = {
    addAuthor,
    getAllAuthors,
    editAuthor,
    deleteAuthor,
};