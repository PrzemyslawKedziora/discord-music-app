const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Song = require("../models/songModel");
const mongoose = require("mongoose");
const sendResponse = require("../utils/sendResponse");

/**
 * @desc Adds a category.
 * @route POST api/categories/add
 * @access admin only
 **/
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // <---- Checking if category with given name already exists ---->
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return sendResponse(res, 409, false, {}, "Category with this name already exists");
  }

  const newCategory = {
    name,
    userID: req.user.id,
  };

  try {
    const category = await Category.create(newCategory);
    return sendResponse(res, 200, true, category, "");
  } catch (error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Sending list of all categories
 * @route POST api/categories/all
 * @access public
 **/
const getAllCategories = asyncHandler(async (req, res) => {
  const categoryList = await Category.find();

  if (categoryList) {
    return sendResponse(res, 200, true, categoryList, "");
  } else {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Edits an existing category
 * @route POST /api/users/:categoryID/edit
 * @access admin only
 **/
const editCategory = asyncHandler(async (req, res) => {
  const categoryID = req.params.categoryID;
  const { name } = req.body;

  // <---- Checking if the provided category id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    return sendResponse(res, 400, false, {}, "Invalid category ID");
  }
  // <---- Finding the user in the database ---->
  const category = await Category.findById(categoryID);
  if (!category) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }

  // <---- Checking if user have permission to modify this category ---->
  if (category.userID.toString() !== req.user.id.toString()) {
    return sendResponse(res, 403, false, {}, "Access denied. You do not have permission to modify another user's category.");
  }

  // <---- Saving the updated category in the database ---->
  category.name = name ? name : category.name;
  try {
    const updatedCategory = await Category.save();
    return sendResponse(res, 200, true, updatedCategory, "");
  } catch(error) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }
});

/**
 * @desc Deletes a category
 * @route DELETE api/categories/:categoryID/delete
 * @access admin only
 **/
const deleteCategory = asyncHandler(async (req, res) => {
  const categoryID = req.params.categoryID;

  // <---- Checking if the provided category id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    return sendResponse(res, 400, false, {}, "Invalid category ID");
  }

  // <---- Finding the category in the database ---->
  const category = await Category.findById(categoryID);
  if (!category) {
    return sendResponse(res, 500, false, {}, "Internal server error");
  }

  // <---- Deleting this category from all the songs
  const DeleteCategoriesFromSongs = async (categoryID) => {
    const filter = { categories: { $in: [categoryID] } };
    const update = { $pull: { categories: categoryID } };
    return await Song.updateMany(filter, update);
  };

  // <---- Deleting song and sending the response ---->
  try {
    const response = await DeleteCategoriesFromSongs(category._id);
    await category.deleteOne();
    return sendResponse(res, 200, true, {
      message: `Category deleted, updated ${response.modifiedCount} songs`,
      songsUpdated: response.modifiedCount, // number of songs that the author's ID have been deleted from
    }, "");
  } catch (error) {
    return sendResponse(res, 400, false, {}, "Failed to delete category from all songs");
  }
});

module.exports = {
  addCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
};
