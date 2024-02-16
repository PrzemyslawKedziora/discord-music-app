const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username!"],
      min: 3,
      max: 50,
      unique: [true, "That username is already taken!"],
    },
    email: {
      type: String,
      required: [true, "Please add the ser email adress!"],
      max: 25,
      unique: [true, "That email adress is already taken!"],
    },
    password: {
      type: String,
      required: [true, "Please add the password!"],
      min: 5,
    },
    profilePicture: {
      type: String,
      required: false,
      default: "",
    },
    botCommand: {
      type: String,
      default: "",
    },
    copyMode: {
      type: String,
      default: "name",
    },
      isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
