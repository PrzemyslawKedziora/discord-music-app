const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//  <----------- reading environment variables from the .env file ----------->
require("dotenv").config();

const app = express();

//  <----------- Parsing the request data from url-encoded format to JSON ----------->
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());

//  <----------- Middlewares ----------->
app.use("/api/users", require("./routes/userRoutes"));



//  <----------- Connecting to the database and starting the app to listen ----------->
const MONGODB_URI = "mongodb+srv://Franciszek123:Karmazyn123@diskontappcluster.r2vfgqh.mongodb.net/music";
const PORT = 4200;

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to the database successfully!");

        app.listen(PORT, () => {
            console.log(`Discord-Music-App listening at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error has occured when trying to connect to the database!", error);
    })