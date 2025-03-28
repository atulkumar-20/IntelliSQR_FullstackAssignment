import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 7000;

const allowedOrigins = [
  'https://intellisqr-fullstackassignment-2.onrender.com',
  'http://localhost:5173'
];

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

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
