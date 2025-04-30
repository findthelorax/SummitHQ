import { Router } from 'express';
import TrailController from '../controllers/trailController';

const router = Router();

router.post('/:mountainId/trails', TrailController.createTrail);
router.get('/:mountainId/trails', TrailController.getTrails);
router.get('/:mountainId/trails/:id', TrailController.getTrail);
router.put('/:mountainId/trails/:id', TrailController.updateTrail);
router.delete('/:mountainId/trails/:id', TrailController.deleteTrail);

export default router;