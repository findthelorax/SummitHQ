import { Router } from 'express';
import EmployeeController from '../controllers/employeeController';

const router = Router();

router.post('/employees', EmployeeController.create);
router.get('/employees', EmployeeController.findAllByMountainId);
router.get('/employees/:id', EmployeeController.findById);
router.put('/employees/:id', EmployeeController.update);
router.delete('/emoployees/:id', EmployeeController.delete);

export default router;