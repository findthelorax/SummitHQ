import { Router } from 'express';
import LiftController from '../controllers/liftController';

const router = Router();

router.post('/:mountainID/lifts', LiftController.createLift);
router.get('/:mountainID/lifts', LiftController.getLifts);
router.get('/:mountainID/lifts/:liftID', LiftController.getLift);
router.put('/:mountainID/lifts/:liftID', LiftController.updateLift);
router.delete('/:mountainID/lifts/:liftID', LiftController.deleteLift);

export default router;