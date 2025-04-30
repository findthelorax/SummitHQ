import express from 'express';
import { connectDatabase } from './config/database';

import mountainRoutes from './routes/mountainRoutes';
import liftRoutes from './routes/liftRoutes';
import trailRoutes from './routes/trailRoutes';
import hutRoutes from './routes/hutRoutes';
import lodgeRoutes from './routes/lodgeRoutes';
import incidentRoutes from './routes/incidentRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import employeeRoutes from './routes/employeeRoutes';
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

app.use('/api/mountains', liftRoutes);
app.use('/api/mountains', trailRoutes);
app.use('/api/mountains', lodgeRoutes);
app.use('/api/mountains', hutRoutes);
app.use('/api/mountains', aidRoomRoutes);
app.use('/api', employeeRoutes);
app.use('/api/mountains', equipmentRoutes);
app.use('/api/mountains', incidentRoutes);

// Log Routes

// app.use('/api/mountains', liftLineChecksRoutes);
// app.use('/api/mountains', trailChecksRoutes);
// app.use('/api/mountains', hutCheckLogsRoutes);
// app.use('/api/mountains', aidRoomCheckLogsRoutes);
// app.use('/api/mountains', equipmentCheckLogsRoutes);
// app.use('/api/mountains', incidentLogRoutes);
// app.use('/api/mountains', incidentEquipmentLogRoutes);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});