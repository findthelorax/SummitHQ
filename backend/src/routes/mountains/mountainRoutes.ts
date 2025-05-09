import { Router } from 'express';
import MountainController from '../../controllers/mountainController';

const router = Router();

router.post('/', MountainController.createMountain);
router.get('/', MountainController.getAllMountains);
router.get('/:mountainID', MountainController.getMountain);
router.put('/:mountainID', MountainController.updateMountain);
router.delete('/:mountainID', MountainController.deleteMountain);
router.delete('/', MountainController.deleteAllMountains);

export default router;