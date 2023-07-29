const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
    addAuthor,
    getAllAuthors,
    editAuthor,
    deleteAuthor,
} = require("../controllers/authorController");

router.post("/add", validateToken, addAuthor);

router.get("/all", getAllAuthors);

router.post("/:authorID/edit", validateToken, editAuthor);

router.delete("/:authorID/delete", validateToken, deleteAuthor);

module.exports = router;
