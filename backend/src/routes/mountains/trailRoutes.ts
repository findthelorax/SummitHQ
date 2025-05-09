import { Router } from 'express';
import TrailController from '../../controllers/trailController';

const router = Router();

router.post('/:mountainID/trails', TrailController.createTrail);
router.get('/:mountainID/trails', TrailController.getTrails);
router.get('/:mountainID/trails/:trailID', TrailController.getTrail);
router.put('/:mountainID/trails/:trailID', TrailController.updateTrail);
router.delete('/:mountainID/trails/:trailID', TrailController.deleteTrail);

export default router;