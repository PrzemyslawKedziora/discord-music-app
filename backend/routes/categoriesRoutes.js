const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
    addCategory,
    getAllCategories,
    editCategory,
    deleteCategory,
} = require("../controllers/categoryController");

router.post("/add" , validateToken, addCategory);

router.get("/all", getAllCategories);

router.post("/:categoryID/edit", validateToken, editCategory);

router.delete("/:categoryID/delete", validateToken, deleteCategory);

module.exports = router;