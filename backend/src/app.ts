import express from 'express';
import { connectDatabase } from './config/database';
import mountainRoutes from './routes/mountainRoutes';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
connectDatabase();

// Routes
app.use('/api', mountainRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});