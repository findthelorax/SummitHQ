import { Router } from 'express';
import AssignController from '../controllers/dispatchAssignmentController';

const router = Router();

router.post('/dispatchAssignment', AssignController.createAssignment);
router.get('/dispatchAssignment', AssignController.getAssignments);
router.get('/dispatchAssignment/:id', AssignController.getAssignment);
router.put('/dispatchAssignment/:id', AssignController.updateAssignment);
router.delete('/dispatchAssignment/:id', AssignController.deleteAssignment);

export default router;