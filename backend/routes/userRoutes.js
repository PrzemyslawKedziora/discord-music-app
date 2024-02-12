const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const validateRequest = require("../middleware/validateRequest");

const {
    registerUser,
    loginUser,
    currentUser,
    editUser,
} = require("../controllers/userController");

router.post("/register", [
        body("username", "Invalid username").notEmpty().isString().trim().isLength({ min: 2 }),
        body("email", "Invalid email").notEmpty().isEmail(),
        body("password", "Invalid password").notEmpty().isString().isLength({ min: 5 })
    ],
    validateRequest,
    registerUser);

router.post("/login", [
        body("email", "Invalid email").notEmpty().isEmail(),
        body("password", "Invalid password").notEmpty().isString().trim().isLength({ min: 5 }),
    ],
    validateRequest,
    loginUser);

router.get("/current", validateToken, currentUser);

router.post("/:userID/edit", 
    validateToken, [
        body("username", "Invalid username").optional().isString().trim().isLength({ min: 2 }),
        body("email", "Invalid email").optional().isEmail(),
        body("profilePictureUrl", "Invalid profilePictureUrl").optional().isURL(),
        body("botCommand", "Invalid botCommand").optional().isString(),
        body("password", "Invalid password").optional().isString().trim().isLength({ min: 5 }),
    ], 
    validateRequest, 
    editUser);

module.exports = router;