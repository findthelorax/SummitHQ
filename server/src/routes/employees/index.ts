import { Router } from 'express';
import employeeRoutes from './employeeRoutes.js';
import dispatchAssignmentRoutes from './dispatchAssignmentRoutes.js';
import employeeMountainAssignmentRoutes from './employeeMountainAssignmentRoutes.js';

const router = Router();

router.use('/', employeeRoutes);
router.use('/', dispatchAssignmentRoutes);
router.use('/', employeeMountainAssignmentRoutes);

export default router;