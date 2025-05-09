import { Router } from 'express';
import LodgeController from '../../controllers/lodgeController';

const router = Router();

router.post('/:mountainID/lodges', LodgeController.createLodge);
router.get('/:mountainID/lodges', LodgeController.getLodges);
router.get('/:mountainID/lodges/:lodgeID', LodgeController.getLodge);
router.put('/:mountainID/lodges/:lodgeID', LodgeController.updateLodge);
router.delete('/:mountainID/lodges/:lodgeID', LodgeController.deleteLodge);

export default router;