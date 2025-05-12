import { Router } from 'express';
import EmployeeMountainAssignmentController from '../../controllers/employeeMountainAssignmentController';

const router = Router();

router.post('/:employeeId/mountainAssignments', EmployeeMountainAssignmentController.createAssignment);
router.get('/:employeeId/mountainAssignments', EmployeeMountainAssignmentController.getAssignments);
router.get('/:employeeId/mountainAssignments/:mountainAssignmentId', EmployeeMountainAssignmentController.getAssignment);
router.put('/:employeeId/mountainAssignments/:mountainAssignmentId', EmployeeMountainAssignmentController.updateAssignment);
router.delete('/:employeeId/mountainAssignments/:mountainAssignmentId', EmployeeMountainAssignmentController.deleteAssignment);

export default router;