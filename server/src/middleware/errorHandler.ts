import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.js';

interface HttpError extends Error {
    status?: number;
}

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.status || 500;

    logger.error(`[${req.method}] ${req.url} - ${statusCode}: ${err.message}`);

    const errorResponse = {
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    res.status(statusCode).json(errorResponse);
};

export default errorHandler;