import { Router } from 'express';
import aidRoomCheckRoutes from './aidRoomCheckRoutes';
import hutCheckRoutes from './hutCheckRoutes';
import liftCheckRoutes from './liftCheckRoutes';
import trailCheckRoutes from './trailCheckRoutes';

import equipmentCheckRoutes from './equipmentCheckRoutes';
import equipmentServiceLogRoutes from './equipmentServiceLogRoutes';
import incidentEquipmentUsageLogRoutes from './incidentEquipmentUsageLogRoutes';

const router = Router();

router.use('/', aidRoomCheckRoutes);
router.use('/', hutCheckRoutes);
router.use('/', liftCheckRoutes);
router.use('/', trailCheckRoutes);

router.use('/', equipmentCheckRoutes);
router.use('/', equipmentServiceLogRoutes);
router.use('/', incidentEquipmentUsageLogRoutes);

export default router;