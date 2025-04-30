import { Router } from 'express';
import LiftController from '../controllers/liftController';

const router = Router();

router.post('/:mountainId/lifts', LiftController.createLift);
router.get('/:mountainId/lifts', LiftController.getLifts);
router.get('/:mountainId/lifts/:id', LiftController.getLift);
router.put('/:mountainId/lifts/:id', LiftController.updateLift);
router.delete('/:mountainId/lifts/:id', LiftController.deleteLift);

export default router;