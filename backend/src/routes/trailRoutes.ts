import { Router } from 'express';
import TrailController from '../controllers/trailController';

const router = Router();

router.post('/trails', TrailController.createTrail);
router.get('/trails', TrailController.getTrails);
router.get('/trails/:id', TrailController.getTrail);
router.put('/trails/:id', TrailController.updateTrail);
router.delete('/trails/:id', TrailController.deleteTrail);

export default router;