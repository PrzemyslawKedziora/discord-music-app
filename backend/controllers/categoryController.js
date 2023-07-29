const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

//@desc Adds a category.
//@route POST api/categories/add
//@access private
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // <---- Checking if user sent all necessary fields ---->
  if (!name) {
    res.status(400);
    throw new Error("You need to provide category's name!");
  }

  // <---- Checking if author with given name already exists ---->
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(400);
    throw new Error("Category with this name already exists!");
  }

  const newCategory = {
    name,
    userID: req.user.id,
  };
  const category = await Category.create(newCategory);
  console.log(category);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400);
    throw new Error("category data was not valid!");
  }
});

//@desc Sending list of all categories
//@route POST api/categories/all
//@access  public
const getAllCategories = asyncHandler(async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500);
    throw new Error(
      "There was a problem trying to get categories from the database!"
    );
  } else {
    res.status(200).json(categoryList);
  }
});

//@desc Edits an existing category
//@route /api/users/:categoryID/edit
//@access private
const editCategory = asyncHandler(async (req, res) => {
  const categoryID = req.params.categoryID;
  const { name } = req.body;

  // <---- Checking if the provided user id is valid ---->
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    res.status(400);
    throw new Error("Invalid category!");
  }
  // <---- Finding the user in the database ---->
  const category = await Category.findById(categoryID);
  if (!category) {
    res.status(500);
    throw new Error(
      "There was a problem trying to get the category object from the database!"
    );
  }

  // <---- Checking if user have permission to modify this category ---->
  if (category.userID.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You cannot change other users' ids'!");
  }

  // <---- Giving the category new value if they have been sent ---->
  category.name = name ? name : category.name;

  // <---- Saving the updated category in the database ---->
  const updatedCategory = await Category.save();

  // <---- Sending the category as a response ---->
  res.status(200).json(updatedCategory);
});

//@desc Deletes a category
//@route DELETE api/categories/:categoryID/delete
//@access private
const deleteCategory = asyncHandler(async (req, res) => {
    const categoryID = req.params.categoryID;
  
    // <---- Checking if the provided category id is valid ---->
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
      res.status(400);
      throw new Error("Invalid category!");
    }
  
    // <---- Finding the author in the database ---->
    const category = await Category.findById(categoryID);
    if (!category) {
      res.status(500);
      throw new Error(
        "There was a problem trying to get the category object from the database!"
      );
    }
  
    // <---- Checking if the current user is the category's creator ---->
    if (category.userID.toString() !== req.user.id) {
      res.status(403);
      throw new Error("You cannot a category author that was not added by you!");
    }
  
    // <---- Deleting song and sending the response ---->
    await category.deleteOne();
    res.status(200).json({ message: "Category deleted!" });
  });

module.exports = {
  addCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
};
