import { Router } from 'express';
import EmployeeController from '../controllers/employeeController';

const router = Router();

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.findAll);
router.get('/:id', EmployeeController.findById);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

export default router;