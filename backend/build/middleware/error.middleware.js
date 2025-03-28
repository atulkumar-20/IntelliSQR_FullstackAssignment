"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    // Handle Prisma errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
            code: 'DATABASE_ERROR',
            message: 'Database operation failed'
        });
    }
    // Handle custom app errors
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json({
            code: err.code,
            message: err.message
        });
    }
    // Handle unexpected errors
    return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred'
    });
};
exports.errorHandler = errorHandler;
