const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
    addCategory,
    getAllCategories
} = require("../controllers/categoryController");

router.post("/add" , validateToken, addCategory);

router.get("/all", getAllCategories);

module.exports = router;