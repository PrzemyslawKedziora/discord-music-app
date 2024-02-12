/**
 * Send a HTTP response with a consistent format
 * @param {Object} res - Response object from Express.js
 * @param {number} statusCode - The HTTP status code.
 * @param {boolean} success - Indicates if the request was successful.
 * @param {Object} [data={}] - The payload to send in the response body, an empty object if success = false.
 * @param {string} [errorMessage=''] - The error message to send in the response body, undefined if success = false, an empty string by default.
 **/
const sendResponse = (res, statusCode, success, data = {}, errorMessage = '') => {
    const responsePayload = {
        success,
        data: success ? data : {},
        error: !success ? errorMessage : "",
    };

    return res.status(statusCode).json(responsePayload);
};

module.exports = sendResponse;