import { Router } from 'express';
import EmployeeController from '../controllers/employeeController';

const router = Router();

router.post('/:mountainId/employees', EmployeeController.create);
router.get('/:mountainId/employees', EmployeeController.findAllByMountainId);
router.get('/:mountainId/employees/:id', EmployeeController.findById);
router.put('/:mountainId/employees/:id', EmployeeController.update);
router.delete('/:mountainId/emoployees/:id', EmployeeController.delete);

export default router;