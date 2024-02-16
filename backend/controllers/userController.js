const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const sendResponse = require('../utils/sendResponse');

/**
 * @desc Registering a user
 * @route POST api/users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    // <---- Checking if user with given email already exists ---->
    let existingUser = await User.findOne({ email });
    if (existingUser) {
        return sendResponse(res, 409, false, {}, "User with this email already exists");
    }
    // <---- Checking if user with given username already exists ---->
    existingUser = await User.findOne({ username });
    if (existingUser) {
        return sendResponse(res, 409, false, {}, "User with this username already exists");
    }

    // <---- Hashing the password ---->
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        const userPayload = { _id: user.id, email: user.email };
        sendResponse(res, 201, true, userPayload);
    } catch (error) {
        sendResponse(res, 500, false, {}, "Internal server error");
    }
});

/**
 * @desc Login user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    // <---- Checking if user with given email exists ---->
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({message: "No user with this email!"});
    };

    // <---- Checking if given password matches the email ---->
    if (await bcrypt.compare(password, user.password)) {
        const userInfo = {
            username: user.username,
            email: user.email,
            id: user.id,
            profilePicture: user.profilePicture,
            botCommand: user.botCommand,
            copyMode: user.copyMode,
            isAdmin: user.isAdmin,
        };
        const accessToken = jwt.sign(
            { user: userInfo },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "100m" }
        );
    
        const userPayload = { ...userInfo, accessToken };
        sendResponse(res, 200, true, userPayload, "");
    } else {
        sendResponse(res, 401, false, {}, "Wrong password");
    }
});

/**
 * @desc Returns currently logged in user information
 * @route POST /api/users/current
 * @access private
 */
const currentUser = asyncHandler(async (req, res) => {
    // <---- req.user was added in the jwt token validation middleware ---->,
    if (req.user) {
        sendResponse(res, 200, true, req.user, "");
    } else {
        sendResponse(res, 500, false, {}, "Internal server error");
    }
});

/**
 * @desc Edits an existing user
 * @route POST /api/users/:userID/edit
 * @access private
 */
const editUser = asyncHandler(async (req,res) => {
    const userID = req.params.userID;
    const { username, email, password, profilePicture, botCommand, copyMode } = req.body;

    // <---- Checking if the provided user id is valid ---->
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        sendResponse(res, 400, false, {}, "Invalid user ID");
    }
  // <---- Finding the user in the database ---->
    const user = await User.findById(userID);
    if (!user) {
        return sendResponse(res, 400, false, {}, "Cannot find user with provided ID");
    }

    // <---- Checking if the current user is the edited user ---->
    if (user._id.toString() !== req.user.id.toString()) {
        sendResponse(res, 403, false, {}, "Access denied. You do not have permission to modify another user's data.");
    }

    // <---- Giving the user new values if they have been sent ---->
    user.username = username ? username : user.username;
    user.email = email ? email : user.email;
    user.profilePicture = profilePicture ? profilePicture : user.profilePicture;
    user.botCommand = botCommand ? botCommand : user.botCommand;
    user.copyMode = copyMode ? copyMode : user.copyMode;
    // <---- If exists, validating, hashing and setting new password ---->
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    // <---- Saving the updated song in the database ---->
    try {
        const updatedUser = await user.save();
        sendResponse(res, 200, true, updatedUser, "");
    } catch (error) {
        sendResponse(res, 500, false, {}, "Internal server error");
    }
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    editUser,
};
