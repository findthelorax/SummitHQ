import { Router } from 'express';
import mountainRoutes from './mountainRoutes';
import locationRoutes from './locationRoutes';
import areaRoutes from './areaRoutes';
import aidRoomRoutes from './aidRoomRoutes';
import hutRoutes from './hutRoutes';
import liftRoutes from './liftRoutes';
import lodgeRoutes from './lodgeRoutes';
import trailRoutes from './trailRoutes';
import equipmentRoutes from './equipmentRoutes';
import incidentRoutes from './incidentRoutes';

const router = Router();

router.use('/', mountainRoutes);
router.use('/', locationRoutes);
router.use('/', areaRoutes);
router.use('/', aidRoomRoutes);
router.use('/', hutRoutes);
router.use('/', liftRoutes);
router.use('/', lodgeRoutes);
router.use('/', trailRoutes);
router.use('/', equipmentRoutes);
router.use('/', incidentRoutes);

export default router;