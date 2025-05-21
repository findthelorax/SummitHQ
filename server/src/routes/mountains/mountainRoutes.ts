import { Router } from 'express';
import MountainController from '../../controllers/mountains/mountainController.js';
import employeeController from '../../controllers/employees/employeeController.js';

const router = Router();

router.post('/', MountainController.createMountain);
router.get('/', MountainController.getAllMountains);
router.get('/:mountainId', MountainController.getMountain);
router.put('/:mountainId', MountainController.updateMountain);
router.delete('/:mountainId', MountainController.deleteMountain);
router.delete('/', MountainController.deleteAllMountains);

router.get('/:mountainId/employees', employeeController.getEmployeesByMountain);

export default router;