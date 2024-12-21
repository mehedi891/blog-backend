"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import status from 'http-status'
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: err,
        //stack: "Stack"
    });
};
exports.default = globalErrorHandler;
