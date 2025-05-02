import { Router } from 'express';
import EmployeeMountainAssignmentController from '../controllers/employeeMountainAssignmentController';

const router = Router();

router.post('/mountainAssignment', EmployeeMountainAssignmentController.createAssignment);
router.get('/mountainAssignment', EmployeeMountainAssignmentController.getAssignments);
router.get('/mountainAssignment/:id', EmployeeMountainAssignmentController.getAssignment);
router.put('/mountainAssignment/:id', EmployeeMountainAssignmentController.updateAssignment);
router.delete('/mountainAssignment/:id', EmployeeMountainAssignmentController.deleteAssignment);

export default router;