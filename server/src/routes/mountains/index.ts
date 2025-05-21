import { Router } from 'express';
import mountainRoutes from './mountainRoutes.js';
import locationRoutes from './locationRoutes.js';
import areaRoutes from './areaRoutes.js';
import aidRoomRoutes from './aidRoomRoutes.js';
import hutRoutes from './hutRoutes.js';
import liftRoutes from './liftRoutes.js';
import lodgeRoutes from './lodgeRoutes.js';
import trailRoutes from './trailRoutes.js';
import incidentRoutes from './incidentRoutes.js';
import weatherRoutes from './weatherRoutes.js';

const router = Router();

router.use('/', mountainRoutes);
router.use('/', locationRoutes);
router.use('/', areaRoutes);
router.use('/', aidRoomRoutes);
router.use('/', hutRoutes);
router.use('/', liftRoutes);
router.use('/', lodgeRoutes);
router.use('/', trailRoutes);
router.use('/', incidentRoutes);
router.use('/', weatherRoutes);

export default router;