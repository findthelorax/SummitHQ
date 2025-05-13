import { Router } from 'express';
import TrailCheckController from '../../controllers/logs/trailCheckController';

const router = Router();

router.post('/:mountainId/trails/:trailId/trailChecks', TrailCheckController.create);
router.get('/:mountainId/trails/:trailId/trailChecks', TrailCheckController.getAll);
router.get('/:mountainId/trails/:trailId/trailChecks/:trailCheckId', TrailCheckController.getById);
router.put('/:mountainId/trails/:trailId/trailChecks/:trailCheckId', TrailCheckController.update);
router.delete('/:mountainId/trails/:trailId/trailChecks/:trailCheckId', TrailCheckController.delete);

export default router;