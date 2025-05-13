import { Router } from 'express';
import TrailController from '../../controllers/mountains/trailController';

const router = Router();

router.post('/:mountainId/trails', TrailController.createTrail);
router.get('/:mountainId/trails', TrailController.getTrails);
router.get('/:mountainId/trails/:trailId', TrailController.getTrail);
router.put('/:mountainId/trails/:trailId', TrailController.updateTrail);
router.delete('/:mountainId/trails/:trailId', TrailController.deleteTrail);

export default router;