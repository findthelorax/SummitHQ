import { Router } from 'express';
import LiftController from '../controllers/liftController';

const router = Router();

router.post('/lifts', LiftController.createLift);
router.get('/lifts', LiftController.getLifts);
router.get('/lifts/:id', LiftController.getLift);
router.put('/lifts/:id', LiftController.updateLift);
router.delete('/lifts/:id', LiftController.deleteLift);

export default router;