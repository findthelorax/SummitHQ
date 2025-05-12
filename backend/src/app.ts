import express from 'express';
import { connectDatabase } from './config/database';
import employeeRoutes from './routes/employees';
import mountainRoutes from './routes/mountains';
import debugRoutes from './routes/debugRoutes'; // Import debug routes
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDatabase();

app.use('/api/employees', employeeRoutes);
app.use('/api/mountains', mountainRoutes);

// Debug Route (only for non-production environments)
if (process.env.NODE_ENV !== 'production') {
    app.use('/api/debug', debugRoutes);
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});