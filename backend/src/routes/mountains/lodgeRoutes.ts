import { Router } from 'express';
import LodgeController from '../../controllers/mountains/lodgeController';

const router = Router();

router.post('/:mountainId/lodges', LodgeController.createLodge);
router.get('/:mountainId/lodges', LodgeController.getLodges);
router.get('/:mountainId/lodges/:lodgeId', LodgeController.getLodge);
router.put('/:mountainId/lodges/:lodgeId', LodgeController.updateLodge);
router.delete('/:mountainId/lodges/:lodgeId', LodgeController.deleteLodge);

export default router;