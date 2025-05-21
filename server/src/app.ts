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

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/api/employees', employeeRoutes);
app.use('/api/mountains', mountainRoutes);
app.use('/api/mountains', equipmentRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.use('/api/debug', debugRoutes);
}

app.use(errorHandler);

app.listen(PORT, IP, () => {
    logger.info(`Server is running on http://${IP}:${PORT}`);
});