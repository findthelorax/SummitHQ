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

// import liftLineChecksRoutes from './routes/liftLineChecksRoutes';
// import trailChecksRoutes from './routes/trailChecksRoutes';
// import hutCheckLogsRoutes from './routes/hutCheckLogsRoutes';
// import aidRoomCheckLogsRoutes from './routes/aidRoomCheckLogsRoutes';
// import equipmentCheckLogsRoutes from './routes/equipmentCheckLogsRoutes';
// import incidentLogRoutes from './routes/incidentLogRoutes';
// import incidentEquipmentLogRoutes from './routes/incidentEquipmentLogRoutes';

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
app.use('/api/mountains', mountainRoutes);

app.use('/api/mountains/:mountainId', liftRoutes);
app.use('/api/mountains/:mountainId', trailRoutes);
app.use('/api/mountains/:mountainId', lodgeRoutes);
app.use('/api/mountains/:mountainId', hutRoutes);
app.use('/api/mountains/:mountainId', aidRoomRoutes);
app.use('/api/mountains/:mountainId', equipmentRoutes);
app.use('/api/mountains/:mountainId', incidentRoutes);

// Log Routes

// app.use('/api/mountains/:mountainId', liftLineChecksRoutes);
// app.use('/api/mountains/:mountainId', trailChecksRoutes);
// app.use('/api/mountains/:mountainId', hutCheckLogsRoutes);
// app.use('/api/mountains/:mountainId', aidRoomCheckLogsRoutes);
// app.use('/api/mountains/:mountainId', equipmentCheckLogsRoutes);
// app.use('/api/mountains/:mountainId', incidentLogRoutes);
// app.use('/api/mountains/:mountainId', incidentEquipmentLogRoutes);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});