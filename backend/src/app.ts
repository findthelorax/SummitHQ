import express from 'express';
import { connectDatabase } from './config/database';
import employeeRoutes from './routes/employees';
import mountainRoutes from './routes/mountains';
import checkRoutes from './routes/logs';
import debugRoutes from './routes/debugRoutes';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDatabase();

app.use('/api/employees', employeeRoutes);
app.use('/api/mountains', mountainRoutes);
app.use('/api/mountains', checkRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.use('/api/debug', debugRoutes);
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});