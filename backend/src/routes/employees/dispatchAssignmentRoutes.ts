import { Router } from 'express';
import AssignController from '../../controllers/employees/dispatchAssignmentController';

const router = Router();

router.post('/:employeeId/dispatchAssignments', AssignController.createAssignment);
router.get('/:employeeId/dispatchAssignments', AssignController.getAssignments);
router.get('/:employeeId/dispatchAssignments/:dispatchAssignmentId', AssignController.getAssignment);
router.put('/:employeeId/dispatchAssignments/:dispatchAssignmentId', AssignController.updateAssignment);
router.delete('/:employeeId/dispatchAssignments/:dispatchAssignmentId', AssignController.deleteAssignment);

export default router;