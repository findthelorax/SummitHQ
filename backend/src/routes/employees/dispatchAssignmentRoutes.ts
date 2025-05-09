import { Router } from 'express';
import AssignController from '../../controllers/dispatchAssignmentController';

const router = Router();

router.post('/dispatchAssignments', AssignController.createAssignment);
router.get('/dispatchAssignments', AssignController.getAssignments);
router.get('/dispatchAssignments/:dispatchAssignmentID', AssignController.getAssignment);
router.put('/dispatchAssignments/:dispatchAssignmentID', AssignController.updateAssignment);
router.delete('/dispatchAssignments/:dispatchAssignmentID', AssignController.deleteAssignment);

export default router;