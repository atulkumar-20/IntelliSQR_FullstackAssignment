import express from 'express';
import { authController } from '../controllers/auth.controller';

const router = express.Router();

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working' });
});

export { router as authRouter };
