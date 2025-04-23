import express from 'express';
import { connectDatabase } from './config/database';
import mountainRoutes from './routes/mountainRoutes';
import liftRoutes from './routes/liftRoutes';
import trailRoutes from './routes/trailRoutes';
import hutRoutes from './routes/hutRoutes';
import lodgeRoutes from './routes/lodgeRoutes';
import incidentRoutes from './routes/incidentRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import aidRoomRoutes from './routes/aidRoomRoutes';
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
app.use('/api', liftRoutes);
app.use('/api', trailRoutes);
app.use('/api', hutRoutes);
// app.use('/api', lodgeRoutes);
// app.use('/api', incidentRoutes);
// app.use('/api', equipmentRoutes);
// app.use('/api', aidRoomRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});