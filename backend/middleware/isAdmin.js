const sendResponse = require("../utils/sendResponse");

const isAdmin = (req, res, next) => {
    if(!req.user.isAdmin) {
        sendResponse(res, 403, false, {}, "Forbidden, admin content only :)");
    }
    next();
}

module.exports = isAdmin;