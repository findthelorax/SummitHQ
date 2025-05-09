import { Router } from 'express';
import employeeRoutes from './employeeRoutes';
import dispatchAssignmentRoutes from './dispatchAssignmentRoutes';
import employeeMountainAssignmentRoutes from './employeeMountainAssignmentRoutes';

const router = Router();

router.use('/', employeeRoutes);
router.use('/', dispatchAssignmentRoutes);
router.use('/', employeeMountainAssignmentRoutes);

export default router;