import { Router } from 'express';
import LiftCheckController from '../../controllers/logs/liftCheckController';

const router = Router();

router.post('/:mountainId/lifts/:liftId/liftChecks', LiftCheckController.create);
router.get('/:mountainId/lifts/:liftId/liftChecks', LiftCheckController.getAll);
router.get('/:mountainId/lifts/:liftId/liftChecks/:liftCheckId', LiftCheckController.getById);
router.put('/:mountainId/lifts/:liftId/liftChecks/:liftCheckId', LiftCheckController.update);
router.delete('/:mountainId/lifts/:liftId/liftChecks/:liftCheckId', LiftCheckController.delete);

export default router;