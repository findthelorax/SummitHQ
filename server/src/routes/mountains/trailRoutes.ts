import { Router } from 'express';
import TrailController from '../../controllers/mountains/trailController.js';
import TrailCheckController from '../../controllers/logs/trailCheckController.js';

const router = Router();

router.post('/:mountainId/trails', TrailController.createTrail);
router.get('/:mountainId/trails', TrailController.getTrails);
router.get('/:mountainId/trails/:trailId', TrailController.getTrail);
router.put('/:mountainId/trails/:trailId', TrailController.updateTrail);
router.delete('/:mountainId/trails/:trailId', TrailController.deleteTrail);

router.post('/:mountainId/trails/:trailId/trailChecks', TrailCheckController.create);
router.get('/:mountainId/trails/:trailId/trailChecks', TrailCheckController.getAll);
router.get('/:mountainId/trails/:trailId/trailChecks/:trailCheckId', TrailCheckController.getById);
router.put('/:mountainId/trails/:trailId/trailChecks/:trailCheckId', TrailCheckController.update);
router.delete('/:mountainId/trails/:trailId/trailChecks/:trailCheckId', TrailCheckController.delete);

export default router;