const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
const Song = require("../models/songModel");
const mongoose = require("mongoose");
const sendResponse = require("../utils/sendResponse");

/**
 * @desc Adds an author
 * @route POST api/authors/add
 * @access private
 **/
const addAuthor = asyncHandler(async (req, res) => {
  const { name, pictureURL } = req.body;

  // <---- Checking if author with given name already exists ---->
  const existingAuthor = await Author.findOne({ name });
  if (existingAuthor) {
    return sendResponse(res, 409, false, {}, "Author with this name already exists");
  }

  const newAuthor = {
    name,
    pictureURL,
    userID: req.user.id,
  };

  try {
    const author = await Author.create(newAuthor);
    return sendResponse(res, 200, true, author, "");
  } catch(error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Sending list of all authors
 * @route POST api/authors/all
 * @access public
 **/
const getAllAuthors = asyncHandler(async (req, res) => {
  const authorList = await Author.find();

  if (authorList) {
    return sendResponse(res, 200, true, authorList, "");
  } else {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Edits an existing author
 * @route POST api/users/:authorID/edit
 * @access private
 **/
const editAuthor = asyncHandler(async (req, res) => {
  const authorID = req.params.authorID;
  const { name, pictureURL } = req.body;

  // <---- Checking if the provided author id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(authorID)) {
    return sendResponse(res, 400, false, {}, "Invalid author ID");
  }
  
  // <---- Finding the author in the database ---->
  const author = await Author.findById(authorID);
  if (!author) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }

  // <---- Checking if user have permission to modify this author ---->
  if (author.userID.toString() !== req.user.id.toString()) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to modify another user's author.");
  }

  // <---- Giving the author new values if they have been sent ---->
  author.name = name ? name : author.name;
  author.pictureURL = name ? pictureURL : author.pictureURL;

  // <---- Saving the updated category in the database ---->
  try {
    const updatedAuthor = await Author.save();
    return sendResponse(res, 200, true, updatedAuthor, "");
  } catch(error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Deletes an author
 * @route DELETE api/authors/:authorID/delete
 * @access private
 **/
const deleteAuthor = asyncHandler(async (req, res) => {
  const authorID = req.params.authorID;

  // <---- Checking if the provided author id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(authorID)) {
    return sendResponse(res, 400, false, {}, "Invalid author ID");
  }

  // <---- Finding the author in the database ---->
  const author = await Author.findById(authorID);
  if (!author) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }

  // <---- Checking if the current user is the author's creator ---->
  if (author.userID.toString() !== req.user.id) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to delet another user's author.");
  }

  // <---- Deleting this author from all the songs
  const DeleteAuthorFromSongs = async (authorID) => {
    const filter = { authors: { $in: [authorID] } };
    const update = { $pull: { authors: authorID } };
    return await Song.updateMany(filter, update);
  };

  try {
    const response = await DeleteAuthorFromSongs(author._id);
    await author.deleteOne();
    return sendResponse(res, 200, true, {
        message: `Author deleted, updated ${response.modifiedCount} songs`,
        songsUpdated: response.modifiedCount, // number of songs that the author's ID have been deleted from
      }, "");
  } catch (error) {
    return sendResponse(res, 400, false, {}, "Failed to delete author from all songs");
  }
});

module.exports = {
  addAuthor,
  getAllAuthors,
  editAuthor,
  deleteAuthor,
};
