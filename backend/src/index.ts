import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 7000;

// Test database connection function
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

// Simple CORS for local development
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRouter);

// Error handling middleware
app.use(errorHandler);

// Start server
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(console.error);
