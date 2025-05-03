import express from 'express';
import { connectDatabase } from './config/database';

import employeeRoutes from './routes/employeeRoutes';
import dispatchAssignmentRoutes from './routes/dispatchAssignmentRoutes';
import employeeMountainAssignmentRoutes from './routes/employeeMountainAssignmentRoutes';

import mountainRoutes from './routes/mountainRoutes';
import locationRoutes from './routes/locationRoutes';
import areaRoutes from './routes/areaRoutes';

import aidRoomRoutes from './routes/aidRoomRoutes';
import hutRoutes from './routes/hutRoutes';
import liftRoutes from './routes/liftRoutes';
import lodgeRoutes from './routes/lodgeRoutes';
import trailRoutes from './routes/trailRoutes';

import incidentRoutes from './routes/incidentRoutes';
import equipmentRoutes from './routes/equipmentRoutes';

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

app.use(express.json());

connectDatabase();

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/employees', employeeMountainAssignmentRoutes);
app.use('/api/employees', dispatchAssignmentRoutes);

app.use('/api/mountains', mountainRoutes);
app.use('/api/mountains', locationRoutes);
app.use('/api/mountains', areaRoutes);

app.use('/api/mountains', aidRoomRoutes);
app.use('/api/mountains', hutRoutes);
app.use('/api/mountains', liftRoutes);
app.use('/api/mountains', lodgeRoutes);
app.use('/api/mountains', trailRoutes);
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

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});