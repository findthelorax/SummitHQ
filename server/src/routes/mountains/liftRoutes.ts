import { Router } from 'express';
import LiftController from '../../controllers/mountains/liftController.js';
import LiftCheckController from '../../controllers/logs/liftCheckController.js';

const router = Router();

router.post('/:mountainId/lifts', LiftController.createLift);
router.get('/:mountainId/lifts', LiftController.getLifts);
router.get('/:mountainId/lifts/:liftId', LiftController.getLift);
router.put('/:mountainId/lifts/:liftId', LiftController.updateLift);
router.delete('/:mountainId/lifts/:liftId', LiftController.deleteLift);

router.post('/:mountainId/lifts/:liftId/liftChecks', LiftCheckController.create);
router.get('/:mountainId/lifts/:liftId/liftChecks', LiftCheckController.getAll);
router.get('/:mountainId/lifts/:liftId/liftChecks/:liftCheckId', LiftCheckController.getById);
router.put('/:mountainId/lifts/:liftId/liftChecks/:liftCheckId', LiftCheckController.update);
router.delete('/:mountainId/lifts/:liftId/liftChecks/:liftCheckId', LiftCheckController.delete);

export default router;