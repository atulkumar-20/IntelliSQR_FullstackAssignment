"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const errors_1 = require("../utils/errors");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            message: err.message
        });
        return;
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            res.status(409).json({
                message: 'Email already exists'
            });
            return;
        }
    }
    res.status(500).json({
        message: err.message || 'Internal server error'
    });
};
exports.errorHandler = errorHandler;
