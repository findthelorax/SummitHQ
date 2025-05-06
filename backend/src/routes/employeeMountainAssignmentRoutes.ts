import { Router } from 'express';
import EmployeeMountainAssignmentController from '../controllers/employeeMountainAssignmentController';

const router = Router();

router.post('/mountainAssignments', EmployeeMountainAssignmentController.createAssignment);
router.get('/mountainAssignments', EmployeeMountainAssignmentController.getAssignments);
router.get('/mountainAssignments/:mountainAssignmentID', EmployeeMountainAssignmentController.getAssignment);
router.put('/mountainAssignments/:mountainAssignmentID', EmployeeMountainAssignmentController.updateAssignment);
router.delete('/mountainAssignments/:mountainAssignmentID', EmployeeMountainAssignmentController.deleteAssignment);

export default router;