import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import employeeRoutes from './routes/employees/index.js';
import mountainRoutes from './routes/mountains/index.js';
import equipmentRoutes from './routes/equipment/index.js';
import debugRoutes from './routes/debugRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import dotenv from 'dotenv';
import logger from './config/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const IP = process.env.IP || 'localhost';

// Update CORS configuration to explicitly handle Railway domains
app.use(
    cors({
        origin: function(origin, callback) {
            // Allow requests with no origin (like mobile apps, curl requests)
            if (!origin) return callback(null, true);
            
            const allowedOrigins = [
                process.env.FRONTEND_URL,
                'https://summithq-production.up.railway.app', // Add your actual Railway client URL
                /\.railway\.app$/, // Allow all Railway domains (as a RegExp)
                'http://localhost:5173', // Local development
                'http://localhost:3000'
            ].filter(Boolean); // Remove any undefined values
            
            // Check if the origin is allowed
            const isAllowed = allowedOrigins.some(allowedOrigin => {
                if (typeof allowedOrigin === 'string') {
                    return allowedOrigin === origin;
                } else if (allowedOrigin instanceof RegExp) {
                    return allowedOrigin.test(origin);
                }
                return false;
            });
            
            if (isAllowed || process.env.NODE_ENV !== 'production') {
                callback(null, true);
            } else {
                callback(new Error(`CORS not allowed for origin: ${origin}`));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.json());

connectDatabase();

app.use('/api/mountains', mountainRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/equipment', equipmentRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.get('/api/healthcheck', (req, res) => {
        res.json({
            status: 'OK',
            environment: process.env.NODE_ENV || 'development',
            railwayEnvironment: process.env.RAILWAY_ENVIRONMENT ? 'true' : 'false',
            frontendUrl: process.env.FRONTEND_URL || 'not set',
            databaseUrlExists: process.env.DATABASE_URL ? 'true' : 'false',
            port: process.env.PORT || '3000'
        });
    });
}

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

export default app;
