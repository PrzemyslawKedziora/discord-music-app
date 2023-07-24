const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

//@desc Adds a category
//@route POST api/categories/add
//@access private
const addCategory = asyncHandler (async (req, res) => {
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

    if(category) {
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

module.exports = {
    addCategory,
    getAllCategories,
};