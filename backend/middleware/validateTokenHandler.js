const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req. headers.authorization;
    
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decodedInfo) => {
            if(error) {
                res.status(401);
                throw new Error("User is not authorized!");
            }
            req.user = decodedInfo.user;
            next();
        })
    }

    if(!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
});

module.exports = validateToken;