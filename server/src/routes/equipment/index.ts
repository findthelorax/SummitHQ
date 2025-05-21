import { Router } from 'express';
import equipmentRoutes from './equipmentRoutes.js';
import equipmentServiceLogRoutes from './equipmentServiceLogRoutes.js';
import incidentEquipmentUsageLogRoutes from './incidentEquipmentUsageLogRoutes.js';

const router = Router();

router.use('/', equipmentRoutes);
router.use('/', equipmentServiceLogRoutes);
router.use('/', incidentEquipmentUsageLogRoutes);

export default router;