"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../utils/errors");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
exports.authController = {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new errors_1.ValidationError('Email and password are required');
                }
                const user = yield prisma.user.findUnique({
                    where: { email }
                });
                if (!user) {
                    throw new errors_1.UnauthorizedError('Invalid credentials');
                }
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    throw new errors_1.UnauthorizedError('Invalid credentials');
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
                res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new errors_1.ValidationError('Email and password are required');
                }
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new errors_1.ValidationError('Invalid email format');
                }
                // Validate password strength
                if (password.length < 6) {
                    throw new errors_1.ValidationError('Password must be at least 6 characters long');
                }
                const existingUser = yield prisma.user.findUnique({
                    where: { email }
                });
                if (existingUser) {
                    throw new errors_1.ValidationError('Email already exists');
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword
                    }
                });
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
                res.status(201).json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
