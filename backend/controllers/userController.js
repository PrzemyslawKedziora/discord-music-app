const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// ======================= P U B L I C   R O U T E S =======================

//@desc Registering a user
//@route POST api/users/register
//@access public
const registerUser = asyncHandler( async (req, res) => {

    const { username, email, password } = req.body;

    // <---- Checking if user sent all necessary fields ---->
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("You need to fulfil all fields!");
    }

    // <---- Checking if user with given email already exists ---->
    let existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User with this email already exists!");
    }
    // <---- Checking if user with given username already exists ---->
    existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(400);
        throw new Error("User with this username already exists!");
    }

    // <---- Hashing the password ---->
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // <---- Creating new user ---->
    const newUser = {
        username,
        email,
        password: hashedPassword
    };
    const user = User.create(newUser);
    console.log("New user created! ", user);

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data was not valid!");
    }
});

//@desc Login user
//@route /api/users/login
//@access public
const loginUser = asyncHandler( async (req, res) => {

    const { email, password } = req.body;

    // <---- Checking if user sent all necessary fields ---->
    if (!email || !password) {
        res.status(400);
        throw new Error("You need to fulfil all fields!");
    };

    const user = await User.findOne({ email })

    // <---- Checking if user with given email exists ---->
    if (!user) {
        res.status(400);
        throw new Error("No user with this email!");
    };

    // <---- Checking if given password matches the email ---->
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "100m"}
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Wrong password!")
    }
});

//@desc Current user information
//@route /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    // <---- req.user was added in the jwt token validation middleware ---->,
    res.json(req.user);
});

//@desc Edits an existing user
//@route /api/users/:userID/edit
//@access private
const editUser = asyncHandler(async (req,res) => {
    const userID = req.params.userID;
    const { username, email, password, profilePicture } = req.body;

    // <---- Checking if the provided user id is valid ---->
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      res.status(400);
      throw new Error("Invalid user!");
    }
  // <---- Finding the user in the database ---->
    const user = await User.findById(userID);
    if (!user) {
        res.status(500);
        throw new Error(
            "There was a problem trying to get the user object from the database!"
        );
    }

// <---- Checking if the current user is the edited user ---->
  if (user._id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You cannot change other users' ids'!");
  }

// <---- Giving the user new values if they have been sent ---->
  user.username = username ? username : user.username;
  user.email = email ? email : user.email;
  user.profilePicture = profilePicture ? profilePicture : user.profilePicture;

// <---- If exists, validating, hashing and setting new password ---->
  if (password) {
    if (password.length < 5) {
        throw new Error("Password not long enough");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

    // <---- Saving the updated song in the database ---->
    const updatedUser = await user.save();

    // <---- Sending the updated song as a response ---->
    res.status(200).json(updatedUser);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    editUser,
};
