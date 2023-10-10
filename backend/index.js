const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//  <----------- reading environment variables from the .env file ----------->
require("dotenv").config();

const app = express();

//  <----------- Parsing the request data from url-encoded format to JSON ----------->
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());


//  <----------- Middlewares ----------->
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://discord-music-app-backend.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors(
    {
        origin: ["https://discord-music-app-server.vercel.app"],
        methods: ["POST","GET","DELETE"],
        credentials: true
    }
));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/songs", require("./routes/songRoutes"));
app.use("/api/authors", require("./routes/authorRoutes"));
app.use("/api/categories", require("./routes/categoriesRoutes"));
app.use("/api/playlists", require("./routes/playlistRoutes"));



//  <----------- Connecting to the database and starting the app to listen ----------->
const MONGODB_URI = process.env.DB_LINK;
const PORT = process.env.PORT;

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
