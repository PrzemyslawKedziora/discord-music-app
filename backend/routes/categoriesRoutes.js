const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const validateRequest = require("../middleware/validateRequest");
const isValidObjectIdValidator = require("../utils/isValidObjectIdValidator");
const isAdmin = require("../middleware/isAdmin");

const {
    addCategory,
    getAllCategories,
    editCategory,
    deleteCategory,
} = require("../controllers/categoryController");

router.post("/add" , validateToken, 
    isAdmin, [
        body("name", "Invalid name").notEmpty().isString().trim().isLength({ min: 1 }),
    ],
    validateRequest,
    addCategory);

router.get("/all", getAllCategories);

router.post("/:categoryID/edit", 
    validateToken, 
    isAdmin, [
        body("name", "Invalid name").notEmpty().isString().trim().isLength({ min: 1 }),
        param("categoryID").custom(isValidObjectIdValidator).withMessage("Invalid category ID")
    ],
    validateRequest,
    editCategory);

router.delete("/:categoryID/delete", 
    validateToken, 
    isAdmin, [
        param("categoryID").custom(isValidObjectIdValidator).withMessage("Invalid category ID")
    ], 
    validateRequest,
    deleteCategory
);

module.exports = router;