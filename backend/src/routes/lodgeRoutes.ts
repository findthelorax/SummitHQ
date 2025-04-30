import { Router } from 'express';
import LodgeController from '../controllers/lodgeController';

const router = Router();

router.post('/:mountainId/lodges', LodgeController.createLodge);
router.get('/:mountainId/lodges', LodgeController.getLodges);
router.get('/:mountainId/lodges/:id', LodgeController.getLodge);
router.put('/:mountainId/lodges/:id', LodgeController.updateLodge);
router.delete('/:mountainId/lodges/:id', LodgeController.deleteLodge);

export default router;