const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
    addAuthor,
    getAllAuthors
} = require("../controllers/authorController");

router.post("/add", validateToken, addAuthor);

router.get("/all", getAllAuthors);

module.exports = router;
