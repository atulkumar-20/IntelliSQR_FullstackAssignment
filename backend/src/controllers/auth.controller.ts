import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ValidationError } from '../utils/errors';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Debug log
      console.log('Registration attempt:', { email, password: '***' });

      // Validate input
      if (!email || !password) {
        throw new ValidationError('Email and password are required');
      }

      // Normalize email
      const normalizedEmail = email.toString().toLowerCase().trim();

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedEmail)) {
        throw new ValidationError('Invalid email format');
      }

      // Validate password strength
      if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters long');
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail }
      });

      if (existingUser) {
        throw new ValidationError('Email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await prisma.user.create({
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
    } catch (error) {
      console.error('Registration error:', error);
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Debug log
      console.log('Login attempt:', { email, password: '***' });

      // Validate input
      if (!email || !password) {
        throw new ValidationError('Email and password are required');
      }

      // Normalize email
      const normalizedEmail = email.toString().toLowerCase().trim();

      // Find user
      const user = await prisma.user.findUnique({
        where: { 
          email: normalizedEmail
        }
      });

      // Debug log
      console.log('User found:', user ? 'yes' : 'no');

      if (!user) {
        throw new ValidationError('Invalid credentials');
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new ValidationError('Invalid credentials');
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Return response
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      next(error);
    }
  }
};
