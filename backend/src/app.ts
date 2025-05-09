import express from 'express';
import { connectDatabase } from './config/database';
import employeeRoutes from './routes/employees';
import mountainRoutes from './routes/mountains';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDatabase();

app.use('/api/employees', employeeRoutes);
app.use('/api/mountains', mountainRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});