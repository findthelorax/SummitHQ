import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
    status?: number;
}

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.status || 500;

    // Log the error details for debugging
    console.error(`[${req.method}] ${req.url} - ${statusCode}: ${err.message}`);

    // Prepare the error response
    const errorResponse = {
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
    };

    // Send the error response
    res.status(statusCode).json(errorResponse);
};

export default errorHandler;