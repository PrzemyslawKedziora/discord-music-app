const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

const {
    registerUser,
    loginUser,
    currentUser,
    editUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.post("/:userID/edit", validateToken, editUser);

module.exports = router;