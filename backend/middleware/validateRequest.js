const { validationResult } = require('express-validator');
const sendResponse = require("../utils/sendResponse");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 422, false, {}, errors.array()[0].msg);
    }
    next();
};

module.exports = validateRequest;
