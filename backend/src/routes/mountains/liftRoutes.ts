import { Router } from 'express';
import LiftController from '../../controllers/liftController';

const router = Router();

router.post('/:mountainId/lifts', LiftController.createLift);
router.get('/:mountainId/lifts', LiftController.getLifts);
router.get('/:mountainId/lifts/:liftId', LiftController.getLift);
router.put('/:mountainId/lifts/:liftId', LiftController.updateLift);
router.delete('/:mountainId/lifts/:liftId', LiftController.deleteLift);

export default router;