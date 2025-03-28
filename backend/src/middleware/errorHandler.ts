import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/errors';

const errorHandler: ErrorRequestHandler = (
  err: Error | AppError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
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

export { errorHandler };
