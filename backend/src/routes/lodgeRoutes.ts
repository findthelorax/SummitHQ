import { Router } from 'express';
import LodgeController from '../controllers/lodgeController';

const router = Router();

router.post('/mountains/:mountainId/lodges', LodgeController.createLodge);
router.get('/mountains/:mountainId/lodges', LodgeController.getLodges);
router.get('/lodges/:id', LodgeController.getLodge);
router.put('/lodges/:id', LodgeController.updateLodge);
router.delete('/lodges/:id', LodgeController.deleteLodge);

export default router;