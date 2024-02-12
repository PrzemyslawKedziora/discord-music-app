const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const validateRequest = require("../middleware/validateRequest");

const {
    addAuthor,
    getAllAuthors,
    editAuthor,
    deleteAuthor,
} = require("../controllers/authorController");

router.post("/add", 
    validateToken, [
        body("name", "Invalid name").notEmpty().isString().trim().isLength({ min: 1 }),
        body("pictureURL", "Invalid pictureURL").optional().isURL(),
    ],
    validateRequest, 
    addAuthor);

router.get("/all", getAllAuthors);

router.post("/:authorID/edit", validateToken, [
        body("name", "Invalid name").optional().isString().trim().isLength({ min: 1 }),
        body("pictureURL", "Invalid pictureURL").optional().isURL(),
    ],
    validateRequest,
    editAuthor);

router.delete("/:authorID/delete", validateToken, deleteAuthor);

module.exports = router;
