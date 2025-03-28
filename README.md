# Full Stack Authentication System

A modern full-stack authentication system built with React, TypeScript, Node.js, and MongoDB. Features include user registration, login, and protected dashboard access.

Live Demo: [https://intellisqr-fullstackassignment.onrender.com](https://intellisqr-fullstackassignment.onrender.com)

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- TanStack Query (React Query)
- React Router DOM
- React Hook Form
- Zod (Form Validation)
- Tailwind CSS
- Axios

### Backend
- Node.js(Typescript)
- Express.js(Typescript)
- Prisma (ORM)
- MongoDB
- JWT Authentication


## Project Structure

```
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── api/          # API integration
│   │   └── types/        # TypeScript types
│   └── ...
│
├── backend/               # Node.js backend application
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/      # API routes
│   │   └── utils/       # Utility functions
│   └── ...
```

## Features

- User Registration
- User Login
- Protected Routes
- JWT Authentication
- Form Validation
- Error Handling
- Responsive Design
- TypeScript Integration
- Database Integration

## Getting Started

### Prerequisites

- Node.js
- MongoDB database
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://www.github.com/atulkumar-20/IntelliSQR_FullstackAssignment.git
cd IntelliSQR_FullstackAssignment
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
touch .env

# Update .env with your MongoDB connection string
# DATABASE_URL="your_mongodb_connection_string"
# JWT_SECRET="your_jwt_secret"

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install

# Create .env file
touch .env

# Update .env with your backend URL
# VITE_API_URL="http://localhost:7000/api/auth"

# Start development server
npm run dev
```

4. **Access the Application**
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:7000](http://localhost:7000)

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

## Deployment

The application is deployed on Render:
- Frontend: Static Site Hosting
- Backend: Web Service
- Database: MongoDB Atlas

### Environment Variables

#### Backend
- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `PORT`: Server port (default: 7000)

#### Frontend
- `VITE_API_URL`: Backend API URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

