import { Router } from 'express';
import TrailController from '../controllers/trailController';

const router = Router();

router.post('/mountains/:mountainId/trails', TrailController.createTrail);
router.get('/mountains/:mountainId/trails', TrailController.getTrails);
router.get('/trails/:id', TrailController.getTrail);
router.put('/trails/:id', TrailController.updateTrail);
router.delete('/trails/:id', TrailController.deleteTrail);

export default router;