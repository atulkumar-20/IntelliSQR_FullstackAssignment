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
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Debug log
            console.log('Registration attempt:', { email, password: '***' });
            // Validate input
            if (!email || !password) {
                throw new errors_1.ValidationError('Email and password are required');
            }
            // Normalize email
            const normalizedEmail = email.toString().toLowerCase().trim();
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(normalizedEmail)) {
                throw new errors_1.ValidationError('Invalid email format');
            }
            // Validate password strength
            if (password.length < 6) {
                throw new errors_1.ValidationError('Password must be at least 6 characters long');
            }
            // Check if user already exists
            const existingUser = yield prisma.user.findUnique({
                where: { email: normalizedEmail }
            });
            if (existingUser) {
                throw new errors_1.ValidationError('Email already exists');
            }
            // Hash password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Create user
            const newUser = yield prisma.user.create({
                data: {
                    email: normalizedEmail,
                    password: hashedPassword
                }
            });
            // Return success response
            res.status(201).json({
                message: 'Account created successfully! Please login.',
                user: {
                    id: newUser.id,
                    email: newUser.email
                }
            });
        }
        catch (error) {
            console.error('Registration error:', error);
            next(error);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Debug log
            console.log('Login attempt:', { email, password: '***' });
            // Validate input
            if (!email || !password) {
                throw new errors_1.ValidationError('Email and password are required');
            }
            // Normalize email
            const normalizedEmail = email.toString().toLowerCase().trim();
            // Find user
            const user = yield prisma.user.findUnique({
                where: {
                    email: normalizedEmail
                }
            });
            // Debug log
            console.log('User found:', user ? 'yes' : 'no');
            if (!user) {
                throw new errors_1.ValidationError('Invalid credentials');
            }
            // Check password
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                throw new errors_1.ValidationError('Invalid credentials');
            }
            // Generate token
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
            // Return response
            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        }
        catch (error) {
            console.error('Login error:', error);
            next(error);
        }
    })
};
